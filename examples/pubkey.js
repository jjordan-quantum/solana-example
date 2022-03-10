const {Buffer} = require('buffer');
const web3 = require('@solana/web3.js');
const crypto = require('crypto');

(async () => {
    // Create a PublicKey with a base58 encoded string
    let base58publicKey = new web3.PublicKey('5xot9PVkphiX2adznghwrAuxGs2zeWisNSxMW6hU6Hkj');
    console.log(base58publicKey.toBase58());

    // 5xot9PVkphiX2adznghwrAuxGs2zeWisNSxMW6hU6Hkj

    // Create a Program Address
    let highEntropyBuffer = crypto.randomBytes(31);
    let programAddressFromKey = await web3.PublicKey.createProgramAddress([highEntropyBuffer.slice(0, 31)], base58publicKey);
    console.log(`Generated Program Address: ${programAddressFromKey.toBase58()}`);

    // Generated Program Address: 3thxPEEz4EDWHNxo1LpEpsAxZryPAHyvNVXJEJWgBgwJ

    // Find Program address given a PublicKey
    let validProgramAddress = await web3.PublicKey.findProgramAddress([Buffer.from('', 'utf8')], programAddressFromKey);
    console.log(`Valid Program Address: ${validProgramAddress}`);

    // Valid Program Address: C14Gs3oyeXbASzwUpqSymCKpEyccfEuSe8VRar9vJQRE,253
})();

