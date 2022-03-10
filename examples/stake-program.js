/*
The StakeProgram facilitates staking SOL and delegating them to any validators on the network.
You can use StakeProgram to create a stake account, stake some SOL,
authorize accounts for withdrawal of your stake, deactivate your stake, and withdraw your funds.
The StakeInstruction class is used to decode and read more instructions from transactions calling 
the StakeProgram
*/

const web3 = require("@solana/web3.js");

(async () => {

    // Fund a key to create transactions
    let fromPublicKey = web3.Keypair.generate();
    let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
    
    let airdropSignature = await connection.requestAirdrop(
        fromPublicKey.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(airdropSignature);
    
    // Create Account
    let stakeAccount = web3.Keypair.generate();
    let authorizedAccount = web3.Keypair.generate();
    /* Note: This is the minimum amount for a stake account -- Add additional Lamports for staking
        For example, we add 50 lamports as part of the stake */
    let lamportsForStakeAccount = (await connection.getMinimumBalanceForRentExemption(web3.StakeProgram.space)) + 50;
    
    let createAccountTransaction = web3.StakeProgram.createAccount({
        fromPubkey: fromPublicKey.publicKey,
        authorized: new web3.Authorized(authorizedAccount.publicKey, authorizedAccount.publicKey),
        lamports: lamportsForStakeAccount,
        lockup: new web3.Lockup(0, 0, fromPublicKey.publicKey),
        stakePubkey: stakeAccount.publicKey
    });
    await web3.sendAndConfirmTransaction(connection, createAccountTransaction, [fromPublicKey, stakeAccount]);
    
    // Check that stake is available
    let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
    console.log(`Stake balance: ${stakeBalance}`)
    // Stake balance: 2282930
    
    // We can verify the state of our stake. This may take some time to become active
    let stakeState = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log(`Stake Stake: ${stakeState.state}`);
    // Stake State: inactive

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Stake Stake: ${stakeState.state}`);
            resolve();
        }, 60 * 1000);
    });
    
    // To delegate our stake, we get the current vote accounts and choose the first
    let voteAccounts = await connection.getVoteAccounts();
    let voteAccount = voteAccounts.current.concat(
        voteAccounts.delinquent,
    )[0];
    let votePubkey = new web3.PublicKey(voteAccount.votePubkey);
    
    // We can then delegate our stake to the voteAccount
    let delegateTransaction = web3.StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: authorizedAccount.publicKey,
        votePubkey: votePubkey,
    });
    await web3.sendAndConfirmTransaction(connection, delegateTransaction, [fromPublicKey, authorizedAccount]);
    
    // To withdraw our funds, we first have to deactivate the stake
    let deactivateTransaction = web3.StakeProgram.deactivate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: authorizedAccount.publicKey,
    });
    await web3.sendAndConfirmTransaction(connection, deactivateTransaction, [fromPublicKey, authorizedAccount]);
    
    // Once deactivated, we can withdraw our funds
    let withdrawTransaction = web3.StakeProgram.withdraw({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: authorizedAccount.publicKey,
        toPubkey: fromPublicKey.publicKey,
        lamports: stakeBalance,
    });
    
    await web3.sendAndConfirmTransaction(connection, withdrawTransaction, [fromPublicKey, authorizedAccount]);
})();