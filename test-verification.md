# Smart Contract Payment Verification Test

## Overview
This document explains how the backend verifies that the correct amount was paid for credits through the smart contract.

## Verification Process

### 1. Transaction Verification Steps

When a user purchases credits, the backend performs these verification steps:

#### Step 1: Basic Transaction Validation
```javascript
// Check if transaction exists and is confirmed
const transaction = await connection.getTransaction(transactionHash);
if (!transaction || transaction.meta.err) {
    return { success: false, message: 'Transaction failed' };
}
```

#### Step 2: Program Involvement Check
```javascript
// Verify our smart contract was involved
const programLogs = transaction.meta.logMessages;
const hasProgramLog = programLogs.some(log => 
    log.includes(programId.toString()) && 
    log.includes('Credits purchased')
);
```

#### Step 3: Vault Transfer Verification
```javascript
// Find vault PDA
const [vaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    programId
);

// Calculate user's SOL sent
const userAmountSent = preBalances[userIndex] - postBalances[userIndex] - fee;

// Calculate vault's SOL received
const vaultAmountReceived = postBalances[vaultIndex] - preBalances[vaultIndex];

// Verify amounts match
if (userAmountSent !== vaultAmountReceived) {
    return { success: false, message: 'Amount mismatch' };
}
```

#### Step 4: Amount Validation
```javascript
// Check if amount matches expected for credits
const expectedAmount = getExpectedAmountForCredits(credits);
if (userAmountSent !== expectedAmount) {
    return { 
        success: false, 
        message: `Expected ${expectedAmount} lamports for ${credits} credits, but received ${userAmountSent}` 
    };
}
```

#### Step 5: Credits Validation from Logs
```javascript
// Extract credits from program logs
for (const log of programLogs) {
    if (log.includes('Credits purchased:')) {
        const match = log.match(/Credits purchased:\s*(\d+)/);
        if (match) {
            const actualCredits = parseInt(match[1]);
            if (actualCredits !== expectedCredits) {
                return { 
                    success: false, 
                    message: `Expected ${expectedCredits} credits, but transaction shows ${actualCredits}` 
                };
            }
        }
    }
}
```

### 2. Credit Pricing Validation

The backend validates against these exact amounts:

```javascript
const pricing = {
    1: 25000000,  // 0.025 SOL = 25,000,000 lamports
    2: 45000000,  // 0.045 SOL = 45,000,000 lamports
    3: 60000000,  // 0.060 SOL = 60,000,000 lamports
    5: 90000000,  // 0.090 SOL = 90,000,000 lamports
    10: 150000000 // 0.150 SOL = 150,000,000 lamports
};
```

### 3. Security Checks

#### ✅ Double Verification
- **Amount Check**: Verify exact lamports transferred
- **Credits Check**: Verify credits from program logs
- **Vault Check**: Verify SOL went to correct vault

#### ✅ Fraud Prevention
- **Duplicate Transaction**: Check if transaction already processed
- **Amount Mismatch**: Reject if wrong amount paid
- **Credits Mismatch**: Reject if wrong credits purchased
- **Vault Mismatch**: Reject if SOL didn't go to vault

#### ✅ Program Validation
- **Program ID**: Verify transaction involves our smart contract
- **Instruction Type**: Verify it's a credit purchase instruction
- **Log Messages**: Verify program emitted correct logs

## Example Verification Flow

### User Purchases 1 Credit (0.025 SOL)

1. **Frontend**: User clicks "Pay Now" for 1 credit
2. **Backend**: Returns expected amount (25,000,000 lamports)
3. **Smart Contract**: User pays exactly 25,000,000 lamports
4. **Backend Verification**:
   ```javascript
   // Check 1: Amount validation
   if (userAmountSent !== 25000000) {
       return { success: false, message: 'Wrong amount paid' };
   }
   
   // Check 2: Credits validation
   if (actualCredits !== 1) {
       return { success: false, message: 'Wrong credits purchased' };
   }
   
   // Check 3: Vault transfer
   if (vaultAmountReceived !== 25000000) {
       return { success: false, message: 'Vault didn\'t receive payment' };
   }
   ```

## Error Scenarios Handled

### ❌ Wrong Amount Paid
```javascript
// User tries to pay 0.01 SOL for 1 credit
// Expected: 25,000,000 lamports
// Actual: 10,000,000 lamports
// Result: Transaction rejected
```

### ❌ Wrong Credits Purchased
```javascript
// User tries to buy 5 credits but pays for 1
// Expected: 5 credits
// Actual: 1 credit in transaction
// Result: Transaction rejected
```

### ❌ Payment to Wrong Address
```javascript
// User sends SOL to wrong address
// Expected: Vault receives payment
// Actual: Different address receives payment
// Result: Transaction rejected
```

### ❌ Duplicate Transaction
```javascript
// User tries to use same transaction hash twice
// Expected: New transaction
// Actual: Already processed transaction
// Result: Transaction rejected
```

## Testing the Verification

### Test Case 1: Valid Purchase
```bash
# 1. Purchase 1 credit for 0.025 SOL
# 2. Backend should verify:
#    - Amount = 25,000,000 lamports ✅
#    - Credits = 1 ✅
#    - Vault received payment ✅
#    - Program logs show "Credits purchased: 1" ✅
```

### Test Case 2: Invalid Amount
```bash
# 1. Try to purchase 1 credit for 0.01 SOL
# 2. Backend should reject:
#    - Amount = 10,000,000 lamports ❌
#    - Expected = 25,000,000 lamports ❌
```

### Test Case 3: Invalid Credits
```bash
# 1. Try to purchase 5 credits but transaction shows 1
# 2. Backend should reject:
#    - Expected credits = 5 ❌
#    - Actual credits = 1 ❌
```

## Benefits of This Verification

1. **Prevents Fraud**: Users can't pay less than required
2. **Ensures Accuracy**: Credits match payment amount
3. **Maintains Integrity**: All payments go to correct vault
4. **Audit Trail**: Complete verification logs
5. **Real-time Validation**: Immediate feedback on invalid transactions

## Conclusion

The backend verification system ensures that:
- ✅ Exact amount is paid for exact credits
- ✅ Payment goes to the correct vault
- ✅ Smart contract processes the transaction correctly
- ✅ No duplicate or fraudulent transactions are accepted
- ✅ Complete audit trail is maintained

This multi-layered verification system provides robust security and ensures the integrity of the credit purchase system. 