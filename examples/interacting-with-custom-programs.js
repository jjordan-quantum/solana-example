// interact with custom programs
// ===============================================================================================

const web3 = require('@solana/web3.js');
const { struct, u32, ns64 } = require('@solana/buffer-layout');
const { Buffer } = require('buffer');

/*

The SystemProgram has the following method signature for allocating space in your account:

pub fn allocate(
    pubkey: &Pubkey,
    space: u64
) -> Instruction

notes:
 
 - in solana, when interacting with a program you must know all the accounts you will be interacting with
 - must provide every account you will be interacting with in the instruction
 - must also provide whether each account is 'isSigner' or 'isWritable'
 - the above method writes to the account by allocating space to it, therefore the pubkey neds to be 'isWritable'
 - 'isSigner' is required when designating the account that is running the instruction
*/

(async () => {
  let keypair = web3.Keypair.generate();
  let payer = web3.Keypair.generate();
  let connection = new web3.Connection(web3.clusterApiUrl('testnet'));

  console.log('Requesting airdrop. Please wait...');
  let airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  console.log('Airdrop request transaction sent!');

  console.log('Confirming airpdrop transaction...');
  await connection.confirmTransaction(airdropSignature);
  console.log('Received airdrop');



  // build transaction for allocation
  console.log('Preparing allocation transaction instruction');
  let allocateTransaction = new web3.Transaction({
    feePayer: payer.publicKey
  });

  let keys = [{pubkey: keypair.publicKey, isSigner: true, isWritable: true}];
  let params = { space: 100 };

  // create a bufferLayout object
  let allocateStruct = {
    index: 8,             // set to 8 bc we are using the 8th position in the instruction enum for SystemProgram
    layout: struct([
      u32('instruction'), // must always have this when using layout to call an instruction
      ns64('space'),      // argument for the allocate function
    ])
  };

  // allocate a data buffer
  let data = Buffer.alloc(allocateStruct.layout.span);

  // map params to layout
  let layoutFields = Object.assign({instruction: allocateStruct.index}, params);

  // encode data buffer, then it will be ready to be sent to the program
  allocateStruct.layout.encode(layoutFields, data);

  // add the transaction instruction to the transaction
  allocateTransaction.add(new web3.TransactionInstruction({
    keys,
    programId: web3.SystemProgram.programId,
    data,
  }));
  
  // broadcast transaction and wait for confirmation
  console.log('Sending and confirming allocation transaction. Please wait...');
  await web3.sendAndConfirmTransaction(connection, allocateTransaction, [payer, keypair]);
  console.log('Allocation transaction confirmed!');

})()
