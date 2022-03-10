const {Keypair} = require("@solana/web3.js")

let account = Keypair.generate();

console.log(account.publicKey.toBase58());
console.log(account.secretKey);

// 2DVaHtcdTf7cm18Zm9VV8rKK4oSnjmTkKE6MiXe18Qsb
// Uint8Array(64) [
//   152,  43, 116, 211, 207,  41, 220,  33, 193, 168, 118,
//    24, 176,  83, 206, 132,  47, 194,   2, 203, 186, 131,
//   197, 228, 156, 170, 154,  41,  56,  76, 159, 124,  18,
//    14, 247,  32, 210,  51, 102,  41,  43,  21,  12, 170,
//   166, 210, 195, 188,  60, 220, 210,  96, 136, 158,   6,
//   205, 189, 165, 112,  32, 200, 116, 164, 234
// ]


let seed = Uint8Array.from([70,60,102,100,70,60,102,100,70,60,102,100,70,60,102,100,70,60,102,100,70,60,102,100,70,60,102,100,70,60,102,100]);
let accountFromSeed = Keypair.fromSeed(seed);

console.log(accountFromSeed.publicKey.toBase58());
console.log(accountFromSeed.secretKey);

// 3LDverZtSC9Duw2wyGC1C38atMG49toPNW9jtGJiw9Ar
// Uint8Array(64) [
//    70,  60, 102, 100,  70,  60, 102, 100,  70,  60, 102,
//   100,  70,  60, 102, 100,  70,  60, 102, 100,  70,  60,
//   102, 100,  70,  60, 102, 100,  70,  60, 102, 100,  34,
//   164,   6,  12,   9, 193, 196,  30, 148, 122, 175,  11,
//    28, 243, 209,  82, 240, 184,  30,  31,  56, 223, 236,
//   227,  60,  72, 215,  47, 208, 209, 162,  59
// ]


let accountFromSecret = Keypair.fromSecretKey(account.secretKey);

console.log(accountFromSecret.publicKey.toBase58());
console.log(accountFromSecret.secretKey);

// 2DVaHtcdTf7cm18Zm9VV8rKK4oSnjmTkKE6MiXe18Qsb
// Uint8Array(64) [
//   152,  43, 116, 211, 207,  41, 220,  33, 193, 168, 118,
//    24, 176,  83, 206, 132,  47, 194,   2, 203, 186, 131,
//   197, 228, 156, 170, 154,  41,  56,  76, 159, 124,  18,
//    14, 247,  32, 210,  51, 102,  41,  43,  21,  12, 170,
//   166, 210, 195, 188,  60, 220, 210,  96, 136, 158,   6,
//   205, 189, 165, 112,  32, 200, 116, 164, 234
// ]