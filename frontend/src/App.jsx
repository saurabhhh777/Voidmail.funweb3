import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter, 
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { Toaster } from 'react-hot-toast';

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx"; 
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Main from "./pages/Main.jsx";
import Premium from "./pages/Premium.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FAQ from "./pages/FAQ.jsx";
import Terms from './pages/Terms.jsx';
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/main" element={<Main/>}/>
            <Route path="/premium" element={<Premium/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/main-test" element={<div>Main Test Page</div>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/terms" element={<Terms/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
