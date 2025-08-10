# Payment Flow Test Guide

## Overview
This document describes how to test the complete payment flow from frontend to backend to smart contract.

## Payment Flow Steps

### 1. Frontend Payment Initiation
- User goes to `/premium` page
- User clicks "Pay Now" on a credit package
- Frontend calls `purchaseCredits(credits)` from web3Store

### 2. Backend API Call
- `purchaseCredits` calls `/api/v1/credit/purchase` with:
  ```json
  {
    "credits": 1,
    "walletAddress": "user_wallet_address"
  }
  ```
- Backend validates request and returns payment details:
  ```json
  {
    "success": true,
    "data": {
      "credits": 1,
      "expectedAmount": 25000000,
      "expectedSol": 0.025,
      "walletAddress": "user_wallet_address",
      "programId": "9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9"
    }
  }
  ```

### 3. Smart Contract Payment
- Frontend calls the deployed smart contract with `purchaseCredits` instruction
- Contract transfers SOL to vault and emits event
- Returns transaction hash

### 4. Backend Verification
- Frontend calls `/api/v1/credit/verify-purchase` with:
  ```json
  {
    "transactionHash": "tx_hash",
    "credits": 1,
    "walletAddress": "user_wallet_address"
  }
  ```
- Backend verifies transaction on Solana
- Backend updates user credits in database
- Returns success response

## Environment Variables Required

### Backend (.env)
```
MONGODB_URL=mongodb://localhost:27017/voidmail
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
```

## Testing Steps

1. **Start Backend Server**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Test Payment Flow**
   - Connect wallet to frontend
   - Go to `/premium` page
   - Click "Pay Now" on any credit package
   - Confirm payment in modal
   - Verify transaction on Solana Explorer
   - Check user credits updated

## Expected Behavior

- ✅ User can purchase credits through frontend
- ✅ Payment processed through smart contract
- ✅ Backend verifies transaction and updates credits
- ✅ User sees updated credit balance
- ✅ Transaction hash displayed with explorer link

## Error Handling

- Insufficient SOL balance
- Network errors
- Invalid transaction
- Duplicate transaction processing
- Unauthorized wallet access

## Security Features

- JWT authentication for API calls
- Wallet address validation
- Transaction verification on-chain
- Duplicate transaction prevention
- Proper error handling and user feedback 