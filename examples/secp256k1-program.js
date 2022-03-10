/*
used to verify secp256k1 signatures
*/

const {keccak_256} = require('js-sha3');
const web3 = require("@solana/web3.js");
const {Transaction} = require("@solana/web3.js");
const secp256k1 = require('secp256k1');

(async () => {

    
    // Create a Ethereum Address from secp256k1
    let secp256k1PrivateKey;
    do {
        secp256k1PrivateKey = web3.Keypair.generate().secretKey.slice(0, 32);
    } while (!secp256k1.privateKeyVerify(secp256k1PrivateKey));
    
    let secp256k1PublicKey = secp256k1.publicKeyCreate(secp256k1PrivateKey, false).slice(1);
    
    let ethAddress = web3.Secp256k1Program.publicKeyToEthAddress(secp256k1PublicKey);
    console.log(`Ethereum Address: 0x${ethAddress.toString('hex')}`);
    
    // Ethereum Address: 0xadbf43eec40694eacf36e34bb5337fba6a2aa8ee
    
    // Fund a keypair to create instructions
    console.log('Funding keypair to create instructions');
    let fromPublicKey = web3.Keypair.generate();
    let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
    
    let airdropSignature = await connection.requestAirdrop(
        fromPublicKey.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(airdropSignature);
    
    // Sign Message with Ethereum Key
    console.log('Signing message with Ethereum key');
    let plaintext = Buffer.from('string address');
    let plaintextHash = Buffer.from(keccak_256.update(plaintext).digest());
    let {signature, recid: recoveryId} = secp256k1.ecdsaSign(
        plaintextHash,
        secp256k1PrivateKey
    );
    
    // Create transaction to verify the signature
    console.log('Create transactions for signature verification');
    let transaction = new Transaction().add(
        web3.Secp256k1Program.createInstructionWithEthAddress({
            ethAddress: ethAddress.toString('hex'),
            message: plaintext,
            signature: signature,
            recoveryId: recoveryId,
        }),
    );
    
    // Transaction will succeed if the message is verified to be signed by the address
    await web3.sendAndConfirmTransaction(connection, transaction, [fromPublicKey]);
    console.log('Signature verification transaction confirmed!');
})();