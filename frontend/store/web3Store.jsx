import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, AnchorProvider, web3, utils, BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { axiosInstance } from "../lib/axios";
import IDL from "../src/idl/voidmail_nft.json";

// Import your program IDL
const PROGRAM_ID = new PublicKey("9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9");

export const useWeb3Store = create(
  persist(
    (set, get) => ({
      // Wallet state
      wallet: null,
      walletAddress: null,
      isConnected: false,
      balance: 0,

      // Program state
      program: null,
      provider: null,

      // Custom email state
      customEmails: [],
      userCredits: 0,
      isLoading: false,
      error: null,

      // Connect wallet
      connectWallet: async (wallet) => {
        try {
          set({ isLoading: true, error: null });
          
          if (!wallet) {
            throw new Error("No wallet provided");
          }

          await wallet.connect();
          const publicKey = wallet.publicKey;
          
          if (!publicKey) {
            throw new Error("Failed to get wallet public key");
          }

          // Create connection and provider
          const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL || "https://api.devnet.solana.com");
          const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

          // Load program with IDL
          const program = new Program(IDL, PROGRAM_ID, provider);

          set({
            wallet,
            walletAddress: publicKey.toString(),
            isConnected: true,
            provider,
            program,
            isLoading: false
          });

          // Get wallet balance
          const balance = await connection.getBalance(publicKey);
          set({ balance: balance / LAMPORTS_PER_SOL });

          // Create user session on backend
          await get().createUserSession();

        } catch (error) {
          set({
            error: error.message,
            isLoading: false
          });
          throw error;
        }
      },

      // Disconnect wallet
      disconnectWallet: async () => {
        try {
          const { wallet } = get();
          if (wallet) {
            await wallet.disconnect();
          }

          set({
            wallet: null,
            walletAddress: null,
            isConnected: false,
            balance: 0,
            program: null,
            provider: null,
            customEmails: []
          });

          // Clear session on backend
          await axiosInstance.post("/api/v1/user/logout");
        } catch (error) {
          console.error("Error disconnecting wallet:", error);
        }
      },

      // Create user session on backend
      createUserSession: async () => {
        try {
          const { walletAddress } = get();
          
          if (!walletAddress) {
            throw new Error("No wallet address");
          }

          const response = await axiosInstance.post("/api/v1/user/session", {
            walletAddress
          });

          return response.data;
        } catch (error) {
          console.error("Error creating user session:", error);
          throw error;
        }
      },

      // Purchase credits
      purchaseCredits: async (credits) => {
        try {
          set({ isLoading: true, error: null });

          const { wallet, walletAddress, program } = get();

          if (!wallet || !walletAddress || !program) {
            throw new Error("Wallet not connected or program not loaded");
          }

          // Validate credits amount
          const validCredits = [1, 2, 3, 5, 10];
          if (!validCredits.includes(credits)) {
            throw new Error("Invalid credits amount");
          }

          // Get required SOL amount
          const solAmounts = {
            1: 0.025,
            2: 0.045,
            3: 0.060,
            5: 0.090,
            10: 0.150
          };

          const requiredSOL = solAmounts[credits];
          const requiredLamports = requiredSOL * LAMPORTS_PER_SOL;

          // Check if user has enough SOL
          const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL || "https://api.devnet.solana.com");
          const balance = await connection.getBalance(wallet.publicKey);

          if (balance < requiredLamports) {
            throw new Error(`Insufficient SOL balance. Need ${requiredSOL} SOL for ${credits} credits.`);
          }

          // Create vault PDA
          const [vaultPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("vault")],
            program.programId
          );

          // Call smart contract to purchase credits
          const tx = await program.methods
            .purchaseCredits(credits)
            .accounts({
              payer: wallet.publicKey,
              vault: vaultPda,
              user: wallet.publicKey,
              systemProgram: web3.SystemProgram.programId,
            })
            .rpc();

          // Verify purchase on backend
          const response = await axiosInstance.post("/api/v1/credit/verify-purchase", {
            transactionHash: tx,
            credits,
            walletAddress
          });

          // Update user credits
          await get().getUserCredits();

          set({ isLoading: false });

          return {
            ...response.data,
            transactionHash: tx
          };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false
          });
          throw error;
        }
      },

      // Create custom email with credits
      createCustomEmail: async (prefix, domain) => {
        try {
          set({ isLoading: true, error: null });

          const { wallet, walletAddress, program } = get();

          if (!wallet || !walletAddress || !program) {
            throw new Error("Wallet not connected or program not loaded");
          }

          // Create mint for NFT
          const mint = web3.Keypair.generate();

          // Create user token account
          const userTokenAccount = await getAssociatedTokenAddress(
            mint.publicKey,
            wallet.publicKey
          );

          // Create custom email on backend (this will check credits)
          const response = await axiosInstance.post("/api/v1/user/createCustomEmail", {
            prefix,
            domain
          });

          // Call smart contract to mint NFT
          const tx = await program.methods
            .createCustomEmail(prefix, domain)
            .accounts({
              payer: wallet.publicKey,
              user: wallet.publicKey,
              mint: mint.publicKey,
              userTokenAccount: userTokenAccount,
              tokenProgram: web3.TokenProgram.programId,
              systemProgram: web3.SystemProgram.programId,
            })
            .signers([mint])
            .rpc();

          // Update custom emails list
          const { customEmails } = get();
          set({
            customEmails: [...customEmails, response.data.data],
            isLoading: false
          });

          // Update credits
          await get().getUserCredits();

          return {
            ...response.data,
            transactionHash: tx
          };
        } catch (error) {
          set({
            error: error.message,
            isLoading: false
          });
          throw error;
        }
      },

      // Get custom emails
      getCustomEmails: async () => {
        try {
          set({ isLoading: true, error: null });

          const { walletAddress } = get();
          
          if (!walletAddress) {
            throw new Error("Wallet not connected");
          }

          const response = await axiosInstance.get("/api/v1/user/customEmails", {
            params: { walletAddress }
          });

          set({
            customEmails: response.data.data,
            isLoading: false
          });

          return response.data.data;
        } catch (error) {
          set({
            error: error.message,
            isLoading: false
          });
          throw error;
        }
      },

      // Get user credits
      getUserCredits: async () => {
        try {
          const { walletAddress } = get();
          
          if (!walletAddress) {
            return 0;
          }

          const response = await axiosInstance.get(`/api/v1/credit/user/${walletAddress}`);
          
          if (response.data.success) {
            set({ userCredits: response.data.data.credits });
            return response.data.data.credits;
          }
          
          return 0;
        } catch (error) {
          console.error("Error getting user credits:", error);
          return 0;
        }
      },

      // Get wallet balance
      getBalance: async () => {
        try {
          const { walletAddress } = get();
          
          if (!walletAddress) {
            return 0;
          }

          const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL || "https://api.devnet.solana.com");
          const publicKey = new PublicKey(walletAddress);
          const balance = await connection.getBalance(publicKey);

          set({ balance: balance / LAMPORTS_PER_SOL });
          return balance / LAMPORTS_PER_SOL;
        } catch (error) {
          console.error("Error getting balance:", error);
          return 0;
        }
      },

      // Get credit transactions
      getCreditTransactions: async () => {
        try {
          const { walletAddress } = get();
          
          if (!walletAddress) {
            return [];
          }

          const response = await axiosInstance.get(`/api/v1/credit/transactions/${walletAddress}`);
          
          if (response.data.success) {
            return response.data.data;
          }
          
          return [];
        } catch (error) {
          console.error("Error getting credit transactions:", error);
          return [];
        }
      },

      // Get Solana transaction history
      getSolanaTransactions: async () => {
        try {
          const { walletAddress } = get();
          
          if (!walletAddress) {
            return [];
          }

          const response = await axiosInstance.get(`/api/v1/transaction/history/${walletAddress}`);
          
          if (response.data.success) {
            return response.data.data;
          }
          
          return [];
        } catch (error) {
          console.error("Error getting Solana transactions:", error);
          return [];
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: "web3-storage",
      partialize: (state) => ({
        walletAddress: state.walletAddress,
        isConnected: state.isConnected,
        customEmails: state.customEmails
      }),
    }
  )
); 