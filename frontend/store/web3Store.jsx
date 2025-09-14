import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, AnchorProvider, web3, utils, BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
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
          console.log('=== CONNECT WALLET START ===');
          console.log('Input wallet:', wallet);
          console.log('Current store state:', {
            isConnected: get().isConnected,
            walletAddress: get().walletAddress,
            wallet: !!get().wallet
          });
          
          set({ isLoading: true, error: null });
          
          if (!wallet) {
            throw new Error("No wallet provided");
          }

          console.log('Connecting wallet:', wallet);
          
          // Safely get public key without accessing _bn property
          let publicKey = null;
          try {
            if (wallet.publicKey) {
              // Handle both string and PublicKey formats
              if (typeof wallet.publicKey === 'string') {
                publicKey = new PublicKey(wallet.publicKey);
              } else if (wallet.publicKey.toBase58) {
                publicKey = wallet.publicKey;
              } else {
                throw new Error("Invalid public key format");
              }
            }
          } catch (pkError) {
            console.error('Error getting public key:', pkError);
            throw new Error("Failed to get wallet public key: " + pkError.message);
          }
          
          console.log('Wallet public key:', publicKey?.toString());
          
          if (!publicKey) {
            throw new Error("Failed to get wallet public key");
          }

          console.log('Creating connection and provider...');
          // Create connection and provider
          const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com");
          const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

          console.log('Loading program with IDL...');
          // Load program with IDL
          const program = new Program(IDL, PROGRAM_ID, provider);

          console.log('Setting wallet state...');
          set({
            wallet,
            walletAddress: publicKey.toString(),
            isConnected: true,
            provider,
            program,
            isLoading: false
          });

          console.log('Wallet state set successfully');

          // Get wallet balance
          try {
            console.log('Getting wallet balance...');
            const balance = await connection.getBalance(publicKey);
            set({ balance: balance / LAMPORTS_PER_SOL });
            console.log('Wallet balance:', balance / LAMPORTS_PER_SOL);
          } catch (balanceError) {
            console.error('Error getting balance:', balanceError);
            set({ balance: 0 });
          }

          // Create user session on backend (optional - don't fail if this fails)
          try {
            console.log('Creating user session...');
            await get().createUserSession();
            console.log('User session created successfully');
          } catch (sessionError) {
            console.error('Error creating user session:', sessionError);
            // Don't throw error - session creation is optional
          }

          console.log('=== CONNECT WALLET COMPLETED SUCCESSFULLY ===');
          console.log('Final store state:', {
            isConnected: get().isConnected,
            walletAddress: get().walletAddress,
            wallet: !!get().wallet
          });

        } catch (error) {
          console.error('=== CONNECT WALLET FAILED ===');
          console.error('Error in connectWallet:', error);
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
          console.log('Disconnecting wallet from store...');
          const { wallet } = get();
          
          if (wallet) {
            try {
              await wallet.disconnect();
              console.log('Wallet adapter disconnected');
            } catch (adapterError) {
              console.error('Error disconnecting wallet adapter:', adapterError);
              // Continue with store cleanup even if adapter disconnect fails
            }
          }

          console.log('Clearing store state...');
          set({
            wallet: null,
            walletAddress: null,
            isConnected: false,
            balance: 0,
            program: null,
            provider: null,
            customEmails: [],
            userCredits: 0,
            error: null
          });

          // Clear session on backend (optional - don't fail if this fails)
          try {
            await axiosInstance.post("/api/v1/user/logout");
            console.log('Backend session cleared');
          } catch (sessionError) {
            console.error('Error clearing backend session:', sessionError);
            // Don't throw error - session clearing is optional
          }

          console.log('Wallet disconnect completed successfully');
        } catch (error) {
          console.error("Error disconnecting wallet:", error);
          // Even if there's an error, try to clear the store state
          set({
            wallet: null,
            walletAddress: null,
            isConnected: false,
            balance: 0,
            program: null,
            provider: null,
            customEmails: [],
            userCredits: 0,
            error: null
          });
        }
      },

      // Check and restore wallet connection state
      checkWalletConnection: async () => {
        try {
          const { wallet, isConnected } = get();
          
          // If we have a wallet but not connected, try to restore connection
          if (wallet && !isConnected) {
            console.log('Restoring wallet connection...');
            await get().connectWallet(wallet);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      },

      // Refresh wallet balance
      refreshBalance: async () => {
        try {
          const { wallet, walletAddress } = get();
          
          if (!wallet || !walletAddress) {
            console.log('No wallet connected, cannot refresh balance');
            return 0;
          }

          console.log('Refreshing wallet balance...');
          const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com");
          const publicKey = new PublicKey(walletAddress);
          
          const balance = await connection.getBalance(publicKey);
          const solBalance = balance / LAMPORTS_PER_SOL;
          
          set({ balance: solBalance });
          console.log('Balance refreshed:', solBalance, 'SOL');
          
          return solBalance;
        } catch (error) {
          console.error('Error refreshing balance:', error);
          set({ balance: 0 });
          return 0;
        }
      },

      // Sync wallet state (new method to handle sync issues)
      syncWalletState: async () => {
        try {
          const { wallet, isConnected } = get();
          
          if (!wallet) {
            console.log('No wallet available for sync');
            return false;
          }

          // Check if wallet is actually connected
          let isWalletConnected = false;
          try {
            if (wallet.connected !== undefined) {
              isWalletConnected = wallet.connected;
            } else if (wallet.publicKey) {
              isWalletConnected = true;
            }
          } catch (error) {
            console.error('Error checking wallet connection state:', error);
            isWalletConnected = false;
          }

          console.log('Wallet sync check:', {
            walletConnected: isWalletConnected,
            storeConnected: isConnected
          });

          // If wallet is connected but store shows disconnected, sync
          if (isWalletConnected && !isConnected) {
            console.log('Syncing wallet to store...');
            await get().connectWallet(wallet);
            return true;
          }

          // If wallet is disconnected but store shows connected, sync
          if (!isWalletConnected && isConnected) {
            console.log('Syncing store to wallet disconnect...');
            await get().disconnectWallet();
            return true;
          }

          return true;
        } catch (error) {
          console.error('Error syncing wallet state:', error);
          return false;
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

          const { walletAddress } = get();

          if (!walletAddress) {
            throw new Error("Wallet not connected");
          }

          // Step 1: Call backend to get payment details
          const paymentResponse = await axiosInstance.post("/api/v1/credit/purchase", {
            credits,
            walletAddress
          });

          if (!paymentResponse.data.success) {
            throw new Error(paymentResponse.data.message || "Failed to get payment details");
          }

          const { expectedAmount, expectedSol, programId } = paymentResponse.data.data;

          // Step 2: Process payment through smart contract
          const { wallet, program } = get();

          if (!wallet || !program) {
            throw new Error("Wallet not connected or program not loaded");
          }

          // Check if user has enough SOL
          const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com");
          const balance = await connection.getBalance(wallet.publicKey);

          if (balance < expectedAmount) {
            throw new Error(`Insufficient SOL balance. Need ${expectedSol} SOL for ${credits} credits.`);
          }

          // Create vault PDA
          const [vaultPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("vault")],
            new PublicKey(programId)
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

          // Step 3: Verify purchase on backend
          const verifyResponse = await axiosInstance.post("/api/v1/credit/verify-purchase", {
            transactionHash: tx,
            credits,
            walletAddress
          });

          if (!verifyResponse.data.success) {
            throw new Error(verifyResponse.data.message || "Failed to verify purchase");
          }

          // Update user credits
          await get().getUserCredits();

          set({ isLoading: false });

          return {
            ...verifyResponse.data,
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
              tokenProgram: TOKEN_PROGRAM_ID,
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

          const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com");
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