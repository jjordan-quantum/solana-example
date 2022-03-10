/*
Normally a transaction is rejected if a transaction's recentBlockhash field is too old. 
To provide for certain custodial services, Nonce Accounts are used. 
Transactions which use a recentBlockhash captured on-chain by a Nonce Account do not 
expire as long at the Nonce Account is not advanced.

You can create a nonce account by first creating a normal account, 
then using SystemProgram to make the account a Nonce Account.

The below example shows both how to create a NonceAccount using SystemProgram.createNonceAccount, 
as well as how to retrieve the NonceAccount from accountInfo. 
Using the nonce, you can create transactions offline with the nonce in place of the recentBlockhash.
*/

const web3 = require('@solana/web3.js');

(async () => {

    // Create connection
    let connection = new web3.Connection(
        web3.clusterApiUrl('devnet'),
        'confirmed',
    );
    
    // Generate accounts
    let account = web3.Keypair.generate();
    let nonceAccount = web3.Keypair.generate();
    
    // Fund account
    let airdropSignature = await connection.requestAirdrop(
        account.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    
    await connection.confirmTransaction(airdropSignature);
    
    // Get Minimum amount for rent exemption
    let minimumAmount = await connection.getMinimumBalanceForRentExemption(
        web3.NONCE_ACCOUNT_LENGTH,
    );
    
    // Form CreateNonceAccount transaction
    let transaction = new web3.Transaction().add(
    web3.SystemProgram.createNonceAccount({
        fromPubkey: account.publicKey,
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: account.publicKey,
        lamports: minimumAmount,
    }),
    );
    // Create Nonce Account
    await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [account, nonceAccount]
    );
    
    let nonceAccountData = await connection.getNonce(
        nonceAccount.publicKey,
        'confirmed',
    );
    
    console.log(nonceAccountData);
    // NonceAccount {
    //   authorizedPubkey: PublicKey {
    //     _bn: <BN: 919981a5497e8f85c805547439ae59f607ea625b86b1138ea6e41a68ab8ee038>
    //   },
    //   nonce: '93zGZbhMmReyz4YHXjt2gHsvu5tjARsyukxD4xnaWaBq',
    //   feeCalculator: { lamportsPerSignature: 5000 }
    // }
    
    let nonceAccountInfo = await connection.getAccountInfo(
        nonceAccount.publicKey,
        'confirmed'
    );
    
    let nonceAccountFromInfo = web3.NonceAccount.fromAccountData(
        nonceAccountInfo.data
    );
    
    console.log(nonceAccountFromInfo);
    // NonceAccount {
    //   authorizedPubkey: PublicKey {
    //     _bn: <BN: 919981a5497e8f85c805547439ae59f607ea625b86b1138ea6e41a68ab8ee038>
    //   },
    //   nonce: '93zGZbhMmReyz4YHXjt2gHsvu5tjARsyukxD4xnaWaBq',
    //   feeCalculator: { lamportsPerSignature: 5000 }
    // }
})();