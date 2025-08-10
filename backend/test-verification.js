// Test script to demonstrate payment verification
import { verifySolanaTransaction } from './services/solana.service.js';

// Test cases for payment verification
const testCases = [
    {
        name: "Valid 1 Credit Purchase",
        transactionHash: "test_hash_1",
        expectedCredits: 1,
        expectedAmount: 25000000, // 0.025 SOL
        description: "Should verify correct amount for 1 credit"
    },
    {
        name: "Valid 5 Credits Purchase", 
        transactionHash: "test_hash_2",
        expectedCredits: 5,
        expectedAmount: 90000000, // 0.090 SOL
        description: "Should verify correct amount for 5 credits"
    },
    {
        name: "Invalid Amount",
        transactionHash: "test_hash_3", 
        expectedCredits: 1,
        expectedAmount: 10000000, // 0.01 SOL (wrong amount)
        description: "Should reject wrong amount for 1 credit"
    }
];

async function testVerification() {
    console.log("🧪 Testing Payment Verification System\n");
    
    for (const testCase of testCases) {
        console.log(`📋 Test: ${testCase.name}`);
        console.log(`📝 Description: ${testCase.description}`);
        console.log(`💰 Expected: ${testCase.expectedCredits} credits for ${testCase.expectedAmount} lamports`);
        
        try {
            // Note: This would use real transaction hash in production
            const result = await verifySolanaTransaction(testCase.transactionHash, testCase.expectedCredits);
            
            if (result.success) {
                console.log(`✅ SUCCESS: Transaction verified`);
                console.log(`   Amount: ${result.amount} lamports`);
                console.log(`   Credits: ${result.credits}`);
                console.log(`   User: ${result.user}`);
                console.log(`   Vault: ${result.vault}`);
            } else {
                console.log(`❌ FAILED: ${result.message}`);
            }
        } catch (error) {
            console.log(`❌ ERROR: ${error.message}`);
        }
        
        console.log("─".repeat(50));
    }
}

// Example of how the verification works in practice
function demonstrateVerificationFlow() {
    console.log("\n🔄 Payment Verification Flow Example:\n");
    
    console.log("1. User clicks 'Pay Now' for 1 credit");
    console.log("2. Frontend calls backend: POST /api/v1/credit/purchase");
    console.log("   Body: { credits: 1, walletAddress: 'user_wallet' }");
    
    console.log("\n3. Backend responds with payment details:");
    console.log("   {");
    console.log("     credits: 1,");
    console.log("     expectedAmount: 25000000,");
    console.log("     expectedSol: 0.025,");
    console.log("     programId: '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9'");
    console.log("   }");
    
    console.log("\n4. Frontend calls smart contract with purchaseCredits(1)");
    console.log("5. Smart contract transfers 25,000,000 lamports to vault");
    console.log("6. Smart contract emits: 'Credits purchased: 1'");
    
    console.log("\n7. Frontend calls backend: POST /api/v1/credit/verify-purchase");
    console.log("   Body: { transactionHash: 'tx_hash', credits: 1, walletAddress: 'user_wallet' }");
    
    console.log("\n8. Backend verification steps:");
    console.log("   ✅ Transaction exists and confirmed");
    console.log("   ✅ Program involved (our smart contract)");
    console.log("   ✅ Vault received 25,000,000 lamports");
    console.log("   ✅ User sent exactly 25,000,000 lamports");
    console.log("   ✅ Program logs show 'Credits purchased: 1'");
    console.log("   ✅ Amount matches expected for 1 credit");
    
    console.log("\n9. Backend updates user credits in database");
    console.log("10. User sees updated credit balance");
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    testVerification();
    demonstrateVerificationFlow();
}

export { testVerification, demonstrateVerificationFlow }; 