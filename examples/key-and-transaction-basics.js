const solanaWeb3 = require('@solana/web3.js');
const {Keypair} = require("@solana/web3.js");
//console.log(solanaWeb3);

// generate a new keypair
// ===============================================================================================

let keypair = Keypair.generate();

// keypair from secret
// ===============================================================================================

let secretKey = Uint8Array.from([
    202, 171, 192, 129, 150, 189, 204, 241, 142,  71, 205,
    2,  81,  97,   2, 176,  48,  81,  45,   1,  96, 138,
    220, 132, 231, 131, 120,  77,  66,  40,  97, 172,  91,
    245,  84, 221, 157, 190,   9, 145, 176, 130,  25,  43,
    72, 107, 190, 229,  75,  88, 191, 136,   7, 167, 109,
    91, 170, 164, 186,  15, 142,  36,  12,  23
  ]);
let keypair1 = Keypair.fromSecretKey(secretKey);

// example transfer
// ===============================================================================================

const {Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL} = require("@solana/web3.js");
const {sendAndConfirmTransaction, clusterApiUrl, Connection} = require("@solana/web3.js");
let fromKeypair = Keypair.generate();
let toKeypair = Keypair.generate();
let transaction = new Transaction();

// creates a transaction ready to be signed and sent
transaction.add(
  SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toKeypair.publicKey,
    lamports: LAMPORTS_PER_SOL
  })
);

let signerkeypair = Keypair.generate();
let connection = new Connection(clusterApiUrl('testnet'));

// sign, sned and confirm - waits for tx to confirm
sendAndConfirmTransaction(
  connection,   // defines which network to send on 
  transaction,  // contains transaction instructions
  [signerkeypair]
);
