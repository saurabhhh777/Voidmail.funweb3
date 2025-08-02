#!/bin/bash

echo "🚀 Deploying Voidmail NFT Contract..."

# Navigate to contract directory
cd contract

# Build the contract
echo "📦 Building contract..."
anchor build

# Deploy to devnet
echo "🌐 Deploying to devnet..."
anchor deploy --provider.cluster devnet

# Get the program ID
PROGRAM_ID=$(solana address -k target/deploy/voidmail_nft-keypair.json)
echo "✅ Program deployed with ID: $PROGRAM_ID"

# Update the IDL file
echo "📝 Updating IDL..."
cp target/idl/voidmail_nft.json ../frontend/src/idl/voidmail_nft.json

echo "🎉 Deployment complete!"
echo "Program ID: $PROGRAM_ID"
echo "Remember to update the PROGRAM_ID in your frontend and backend configuration." 