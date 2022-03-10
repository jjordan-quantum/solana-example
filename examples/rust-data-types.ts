// structs
// =============================================================================================

import BN from 'bn.js';
import {Struct} from '@solana/web3.js';

/*
The struct class is used to create Rust compatible structs in javascript. 
This class is only compatible with Borsh encoded Rust structs.
*/

export class Fee extends Struct {
  denominator: BN;
  numerator: BN;
}

// enum
// =============================================================================================

import {Enum} from '@solana/web3.js';

/*
The Enum class is used to represent a Rust compatible Enum in javascript.
The enum will just be a string representation if logged but can be properly encoded/decoded 
when used in conjunction with Struct. This class is only compatible with Borsh encoded Rust enumerations.
*/

export class AccountType extends Enum {}
