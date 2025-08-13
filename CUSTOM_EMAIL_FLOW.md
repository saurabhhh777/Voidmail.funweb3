# Custom Email Creation Flow

## Overview
This document explains how users can create custom email addresses using credits in the Voidmail Web3 platform.

## Prerequisites
1. **Wallet Connection**: User must have a Solana wallet connected (Phantom, Solflare, etc.)
2. **Credits**: User must have at least 1 credit to create a custom email
3. **SOL Balance**: User needs SOL to purchase credits (if they don't have any)

## Step-by-Step Process

### 1. Purchase Credits
- Navigate to the **Premium** page (`/premium`)
- If wallet is connected, you'll see your current balance and credits
- Choose a credit package:
  - 1 Credit: 0.025 SOL
  - 2 Credits: 0.045 SOL  
  - 3 Credits: 0.060 SOL
  - 5 Credits: 0.090 SOL
  - 10 Credits: 0.150 SOL
- Click "Pay Now" to purchase credits
- Transaction is processed through Solana smart contract
- Credits are added to your account

### 2. Create Custom Email
- On the Premium page, switch to the "Create Email" tab
- Enter your desired email prefix (e.g., "john", "alice", "mycompany")
- Select a domain from available options:
  - `voidmail.fun` (Most popular)
  - `voidmail.email` (Professional)
  - `bigtimer.site` (Unique branding)
  - `asksaurabh.xyz` (Premium custom)
- Preview your email: `prefix@domain.com`
- Click "Create Email" button
- **1 credit is automatically deducted** from your account
- Smart contract mints an NFT as proof of ownership
- Your custom email is created and ready to use

### 3. Using Your Custom Email
- Your custom email is immediately active
- You can receive emails at `yourprefix@domain.com`
- The NFT serves as proof of ownership
- Email is valid for 24 hours from creation
- You can view your custom emails in the Dashboard

## Wallet Balance Display
- **SOL Balance**: Shows your current Solana testnet balance
- **Credits**: Shows available credits for creating emails
- **Auto-refresh**: Balance updates every 30 seconds
- **Manual refresh**: Click "Refresh" button to update immediately

## Troubleshooting

### Wallet Sync Issues
If you see "Store: ❌" in the wallet status:
1. Click the "Sync" button to sync wallet state
2. If that doesn't work, try disconnecting and reconnecting your wallet
3. Check browser console for any error messages

### "_bn" Property Error
This error occurs when there are BigNumber serialization issues:
1. The app now automatically tries to sync instead of connect when this happens
2. Click "Sync Store" button in the navbar
3. If issues persist, refresh the page and reconnect wallet

### Insufficient Credits
If you don't have enough credits:
1. Purchase more credits from the "Purchase Credits" section
2. Each custom email costs exactly 1 credit
3. Credits never expire and can be used anytime

### Insufficient SOL
If you don't have enough SOL:
1. Get testnet SOL from a faucet (for testing)
2. Ensure you're on Solana Devnet for testing
3. Check your wallet balance in the Premium page

## Technical Details
- **Smart Contract**: Credits are purchased through Solana program
- **NFT Minting**: Each custom email gets a unique NFT
- **Backend Integration**: Email creation is verified on backend
- **Real-time Updates**: Balance and credits update automatically
- **Error Handling**: Comprehensive error handling for wallet issues 