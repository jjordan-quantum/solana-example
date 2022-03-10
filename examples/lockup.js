/*
Lockup is used in conjunction with the StakeProgram to create an account. 
The Lockup is used to determine how long the stake will be locked, or unable to be retrieved. 
If the Lockup is set to 0 for both epoch and the Unix timestamp, the lockup will be disabled 
for the stake account.
*/

const {Authorized, Keypair, Lockup, StakeProgram} = require("@solana/web3.js");

(async () => {

    let account = Keypair.generate();
    let stakeAccount = Keypair.generate();
    let authorized = new Authorized(account.publicKey, account.publicKey);
    let lockup = new Lockup(0, 0, account.publicKey);
    
    let createStakeAccountInstruction = StakeProgram.createAccount({
        fromPubkey: account.publicKey,
        authorized: authorized,
        lamports: 1000,
        lockup: lockup,
        stakePubkey: stakeAccount.publicKey
    });
})();