# Voidmail.fun Bounty Platform API

A full-stack Web3-enabled bounty platform built using the MERN stack with wallet-based authentication and Solana smart contract integration.

## Features

✅ **Wallet-based Authentication**: Users and admins authenticate using Solana wallet addresses
✅ **Session-based Auth**: Secure session management with MongoDB
✅ **Bounty Management**: Complete CRUD operations for bounties
✅ **Admin Panel**: Role-based admin system (superadmin, moderator)
✅ **Smart Contract Integration**: Optional on-chain bounty creation and rewards
✅ **Secure API Middleware**: Session-based route protection

## API Endpoints

### Authentication
- `POST /api/user/session` - Create user session with wallet
- `POST /api/user/logout` - Logout user
- `GET /api/user/profile` - Get user profile (protected)
- `POST /api/user/email` - Create temporary email (protected)

### Bounty Management
- `GET /api/bounty` - Get all bounties (public)
- `GET /api/bounty/:id` - Get bounty by ID (public)
- `POST /api/bounty` - Create bounty (authenticated)
- `PUT /api/bounty/:id` - Update bounty (authenticated)
- `DELETE /api/bounty/:id` - Delete bounty (authenticated)
- `POST /api/bounty/:id/submit` - Submit solution (authenticated)
- `GET /api/bounty/user` - Get user's bounties (authenticated)

### Admin Routes
- `POST /api/admin/create` - Create admin wallet
- `GET /api/admin/all` - Get all admin wallets (admin only)
- `GET /api/admin/:walletAddress` - Get admin by address (admin only)
- `PUT /api/admin/:walletAddress/role` - Update admin role (admin only)
- `DELETE /api/admin/:walletAddress` - Delete admin (admin only)
- `PUT /api/bounty/:id/submissions/:submissionId/review` - Review submission (admin only)

### Email Management
- `GET /api/email` - Get emails for user
- `POST /api/email` - Save email

## Authentication Flow

1. **Wallet Connection**: User connects their Solana wallet
2. **Session Creation**: Call `POST /api/user/session` with wallet address
3. **Session Token**: Server returns session token (stored in HTTP-only cookie)
4. **Protected Routes**: Include session token in requests for protected endpoints

## Bounty Schema

```javascript
{
  title: String,
  description: String,
  reward: {
    amount: Number,
    currency: "SOL" | "USDC"
  },
  status: "active" | "completed" | "cancelled" | "expired",
  category: "development" | "design" | "content" | "marketing" | "research" | "other",
  difficulty: "easy" | "medium" | "hard" | "expert",
  createdBy: String, // wallet address
  assignedTo: String, // wallet address
  deadline: Date,
  requirements: [String],
  attachments: [{ name: String, url: String }],
  tags: [String],
  isOnChain: Boolean,
  onChainTxHash: String,
  submissions: [{
    walletAddress: String,
    description: String,
    attachments: [{ name: String, url: String }],
    submittedAt: Date,
    status: "pending" | "approved" | "rejected",
    reviewedBy: String,
    reviewedAt: Date,
    feedback: String
  }]
}
```

## Environment Variables

```env
MONGODB_URL=mongodb://localhost:27017/voidmail
SOLANA_RPC_URL=https://api.devnet.solana.com
ADMIN_WALLET_PUBKEY=your_admin_wallet_public_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables

3. Start the server:
```bash
npm start
```

## Smart Contract Integration

The platform optionally integrates with Solana smart contracts:

- **On-chain Bounty Creation**: When `isOnChain: true`, bounty is recorded on-chain
- **On-chain Rewards**: Approved submissions can trigger on-chain reward transfers
- **Wallet Verification**: Secure signature verification for wallet authentication

## Security Features

- **Session-based Authentication**: Secure session tokens with expiration
- **Role-based Access Control**: Admin roles (superadmin, moderator)
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for production security
- **Error Handling**: Proper error responses without exposing internals

## Database Models

- **UserSession**: Session management with wallet addresses
- **User**: User profiles and preferences
- **AdminWallet**: Admin wallet addresses and roles
- **Bounty**: Complete bounty management
- **EmailInbox**: Email storage and retrieval
- **TransactionHistory**: On-chain transaction records

## Development

The API is built with:
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **Solana Web3.js**: Blockchain integration
- **JWT-like Sessions**: Custom session management
- **CORS**: Cross-origin resource sharing 