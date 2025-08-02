# Credit System for Voidmail.fun

## Overview

The credit system allows users to purchase credits and use them to create custom email addresses. This provides a more flexible and secure payment model compared to direct SOL payments.

## How It Works

### 1. Credit Purchase
- Users can purchase credits in different amounts: 1, 2, 3, 5, or 10 credits
- Each credit costs a different amount of SOL:
  - 1 Credit: 0.025 SOL
  - 2 Credits: 0.045 SOL (10% discount)
  - 3 Credits: 0.060 SOL (20% discount)
  - 5 Credits: 0.090 SOL (28% discount)
  - 10 Credits: 0.150 SOL (40% discount)

### 2. Credit Usage
- 1 credit = 1 custom email address
- Credits never expire
- Users can use credits anytime
- Credits are deducted when creating custom emails

### 3. Security Features
- Smart contract validates payment amounts
- Backend verifies transactions on Solana
- Frontend cannot manipulate prices
- All transactions are recorded on blockchain

## Smart Contract Changes

### New Instructions
1. `purchaseCredits(credits: u8)` - Purchase credits with SOL
2. `createCustomEmail(prefix: String, domain: String)` - Create email using credits

### Events
- `CreditsPurchased` - Emitted when credits are purchased
- `CustomEmailCreated` - Emitted when email is created

## Backend Changes

### New Models
- `CreditPurchase` - Tracks credit purchases
- Updated `User` model with `credits` field

### New Controllers
- `credit.controller.js` - Handles credit operations
- Updated `user.controller.js` - Credit-based email creation

### New Routes
- `GET /api/v1/credit/pricing` - Get credit pricing
- `POST /api/v1/credit/verify-purchase` - Verify credit purchase
- `GET /api/v1/credit/user/:walletAddress` - Get user credits

## Frontend Changes

### New Features
- Credit purchase interface
- Credit balance display
- Tab-based navigation (Credits vs Create Email)
- Credit-based email creation

### Updated Components
- `Premium.jsx` - New credit system UI
- `web3Store.jsx` - Credit management functions
- `PaymentConfirmation.jsx` - Supports credit purchases

## API Endpoints

### Credit Management
```javascript
// Get credit pricing
GET /api/v1/credit/pricing

// Verify credit purchase
POST /api/v1/credit/verify-purchase
{
  "transactionHash": "string",
  "credits": number,
  "walletAddress": "string"
}

// Get user credits
GET /api/v1/credit/user/:walletAddress
```

### Email Creation
```javascript
// Create custom email (now uses credits)
POST /api/v1/user/createCustomEmail
{
  "prefix": "string",
  "domain": "string"
}
```

## Security Considerations

1. **Contract Validation**: Smart contract validates credit amounts and payment
2. **Backend Verification**: Backend verifies transactions on Solana
3. **Amount Validation**: Backend checks payment amounts match expected values
4. **Credit Deduction**: Credits are deducted atomically with email creation
5. **Transaction Tracking**: All purchases are tracked to prevent double-spending

## Deployment

1. Deploy the updated smart contract:
   ```bash
   cd contract
   anchor build
   anchor deploy --provider.cluster devnet
   ```

2. Update the program ID in:
   - `frontend/src/idl/voidmail_nft.json`
   - `frontend/store/web3Store.jsx`
   - `backend/services/solana.service.js`

3. Start the backend and frontend servers

## Benefits

1. **Flexible Pricing**: Users can buy credits in bulk for discounts
2. **Better UX**: Clear credit system with balance display
3. **Security**: Contract-level validation prevents price manipulation
4. **Scalability**: Easy to add new credit packages
5. **Transparency**: All transactions recorded on blockchain 