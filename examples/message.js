const {Buffer} = require("buffer");
const bs58 = require('bs58');
const web3 = require('@solana/web3.js');

(async () => {
    
    let toPublicKey = web3.Keypair.generate().publicKey;
    let fromPublicKey = web3.Keypair.generate();
    
    let connection = new web3.Connection(
        web3.clusterApiUrl('devnet'),
        'confirmed'
    );
    
    let airdropSignature = await connection.requestAirdrop(
        fromPublicKey.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    
    await connection.confirmTransaction(airdropSignature);
    
    let type = web3.SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
    let data = Buffer.alloc(type.layout.span);
    let layoutFields = Object.assign({instruction: type.index});
    type.layout.encode(layoutFields, data);
    
    let recentBlockhash = await connection.getRecentBlockhash();
    
    let messageParams = {
        accountKeys: [
            fromPublicKey.publicKey.toString(),
            toPublicKey.toString(),
            web3.SystemProgram.programId.toString()
        ],
        header: {
            numReadonlySignedAccounts: 0,
            numReadonlyUnsignedAccounts: 1,
            numRequiredSignatures: 1,
        },
        instructions: [
            {
            accounts: [0, 1],
            data: bs58.encode(data),
            programIdIndex: 2,
            },
        ],
        recentBlockhash,
    };
    
    let message = new web3.Message(messageParams);
    
    let transaction = web3.Transaction.populate(
        message,
        [fromPublicKey.publicKey.toString()]
    );
    
    await web3.sendAndConfirmTransaction(connection, transaction, [fromPublicKey]);
    console.log('Tranasaction confirmed');
})();