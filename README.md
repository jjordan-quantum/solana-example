## Some common commands for interacting with solana

### CREATE WALLET
```
mkdir ~/my-solana-wallet
solana-keygen new --outfile ~/my-solana-wallet/my-keypair.json
```

### DISPLAY PUBLIC KEY
```
solana-keygen pubkey ~/my-solana-wallet/my-keypair.json
```

### VERIFY ADDRESS
```
solana-keygen verify <PUBKEY> ~/my-solana-wallet/my-keypair.json
```

### CONFIRM WHICH CLUSTER
```
solana config get
```

### TARGET SPECIFIC CLUSTER
```
solana config set --url https://api.devnet.solana.com
solana config set --url http://localhost:8899
```

### ENSURE VERSIONS MATCH
```
solana --version
solana cluster-version
```

### AIRDROP TOKENS FROM TESTNET
```
solana airdrop 1 <RECIPIENT_ACCOUNT_ADDRESS> --url https://api.devnet.solana.com
```

### CHECK BALANCE
```
solana balance <ACCOUNT_ADDRESS> --url https://api.devnet.solana.com
```

### EXAMPLE TO TRANSFER TOKENS
create a new wallet to transfer tokens to
```
solana-keygen new --no-passphrase --no-outfile
```
then copy public key from output:
```
pubkey: GKvqsuNcnwWqPzzuhLmGi4rzzh55FhJtGizkhHaEJqiV
```
transfer tokens:
```
solana transfer --from <KEYPAIR> <RECIPIENT_ACCOUNT_ADDRESS> 0.5 --allow-unfunded-recipient --url https://api.devnet.solana.com --fee-payer <KEYPAIR>
```
confirm balance of recipient account
```
solana balance <ACCOUNT_ADDRESS> --url http://api.devnet.solana.com
```

### DEPLOY A PROGRAM
```
solana program deploy <PROGRAM_FILEPATH>
```
successful deployment will return a program id
```
Program Id: 3KS2k14CmtnuVv2fvYcvdrNgC94Y11WETBpMUGgXyWZL
```
specify a keypair and deploy a specific program id
```
solana program deploy --program-id <KEYPAIR_FILEPATH> <PROGRAM_FILEPATH>
```
If the program id is not specified on the command line the tools will first look for a keypair file matching the <PROGRAM_FILEPATH>, or internally generate a new keypair.

A matching program keypair file is in the same directory as the program's shared object, and named <PROGRAM_NAME>-keypair.json. Matching program keypairs are generated automatically by the program build tools:
```
./path-to-program/program.so
./path-to-program/program-keypair.json
```

### GET INFORMATION ABOUT PROGRAM ACCOUNT
```
solana program show <ACCOUNT_ADDRESS>
```
output will look like
```
Program Id: 3KS2k14CmtnuVv2fvYcvdrNgC94Y11WETBpMUGgXyWZL
Owner: BPFLoaderUpgradeab1e11111111111111111111111
ProgramData Address: EHsACWBhgmw8iq5dmUZzTA1esRqcTognhKNHUkPi4q4g
Authority: FwoGJNUaJN2zfVEex9BB11Dqb3NJKy3e9oY3KTh9XzCU
Last Deployed In Slot: 63890568
Data Length: 5216 (0x1460) bytes
```

## REDPLOY A PROGRAM
use the same command as deploy
```
solana program deploy <PROGRAM_FILEPATH>
```
to allow for program growth in the future use the --max-len arg
```
solana program deploy --max-len 200000 <PROGRAM_FILEPATH>
```

## SYSTEM PROGRAM INSTRUCTIONS
https://github.com/solana-labs/solana/blob/21bc43ed58c63c827ba4db30426965ef3e807180/sdk/program/src/system_instruction.rs#L142-L305 
```
pub enum SystemInstruction {
    /** 0 **/CreateAccount {/**/},
    /** 1 **/Assign {/**/},
    /** 2 **/Transfer {/**/},
    /** 3 **/CreateAccountWithSeed {/**/},
    /** 4 **/AdvanceNonceAccount,
    /** 5 **/WithdrawNonceAccount(u64),
    /** 6 **/InitializeNonceAccount(Pubkey),
    /** 7 **/AuthorizeNonceAccount(Pubkey),
    /** 8 **/Allocate {/**/},
    /** 9 **/AllocateWithSeed {/**/},
    /** 10 **/AssignWithSeed {/**/},
    /** 11 **/TransferWithSeed {/**/},
}
```