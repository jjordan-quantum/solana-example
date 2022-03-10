/*
Vote account is an object that grants the capability of decoding vote accounts 
from the native vote account program on the network.
*/

// TODO - FIX!!! not working!
// RangeError [ERR_OUT_OF_RANGE]: The value of "offset" is out of range. It must be >= 0 and <= 3727. Received 3734

const web3 = require('@solana/web3.js');

(async () => {
    
    let connection = new web3.Connection(
        web3.clusterApiUrl('devnet'),
        'confirmed',
    );

    let voteAccountInfo = await connection.getProgramAccounts(web3.VOTE_PROGRAM_ID);
    let voteAccountFromData = web3.VoteAccount.fromAccountData(voteAccountInfo[0].account.data);
    console.log(voteAccountFromData);
    /*
    VoteAccount {
    nodePubkey: PublicKey {
        _bn: <BN: cf1c635246d4a2ebce7b96bf9f44cacd7feed5552be3c714d8813c46c7e5ec02>
    },
    authorizedWithdrawer: PublicKey {
        _bn: <BN: b76ae0caa56f2b9906a37f1b2d4f8c9d2a74c1420cd9eebe99920b364d5cde54>
    },
    commission: 10,
    rootSlot: 104570885,
    votes: [
        { slot: 104570886, confirmationCount: 31 },
        { slot: 104570887, confirmationCount: 30 },
        { slot: 104570888, confirmationCount: 29 },
        { slot: 104570889, confirmationCount: 28 },
        { slot: 104570890, confirmationCount: 27 },
        { slot: 104570891, confirmationCount: 26 },
        { slot: 104570892, confirmationCount: 25 },
        { slot: 104570893, confirmationCount: 24 },
        { slot: 104570894, confirmationCount: 23 },
        ...
    ],
    authorizedVoters: [ { epoch: 242, authorizedVoter: [PublicKey] } ],
    priorVoters: [
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object], [Object],
        [Object], [Object]
    ],
    epochCredits: [
        { epoch: 179, credits: 33723163, prevCredits: 33431259 },
        { epoch: 180, credits: 34022643, prevCredits: 33723163 },
        { epoch: 181, credits: 34331103, prevCredits: 34022643 },
        { epoch: 182, credits: 34619348, prevCredits: 34331103 },
        { epoch: 183, credits: 34880375, prevCredits: 34619348 },
        { epoch: 184, credits: 35074055, prevCredits: 34880375 },
        { epoch: 185, credits: 35254965, prevCredits: 35074055 },
        { epoch: 186, credits: 35437863, prevCredits: 35254965 },
        { epoch: 187, credits: 35672671, prevCredits: 35437863 },
        { epoch: 188, credits: 35950286, prevCredits: 35672671 },
        { epoch: 189, credits: 36228439, prevCredits: 35950286 },
        ...
    ],
    lastTimestamp: { slot: 104570916, timestamp: 1635730116 }
    }
    */
})();
