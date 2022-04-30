# Elrond NETWORK
 Link : https://www.youtube.com/watch?v=W8qYtbiTgEI&list=PLQVcheGWwBRUTaG59ZybxJsPhMKS1pkHM
##    1. Overview
### 1.1 Adaptive State Sharding 
- State Transactions & Network Sharding
- 1 Metachain, 3 execution shards
- Dynamically add shards to scale with demand
### 1.2 Secure proof of State
- BFT-like(Byzantine fault) consensus mechanism
- Random sampling for consensus group
- validators randomly shuffled between shards
- unbiasable randomness source 
### 1.3 Smart Accounts
- Individual data trie
- Key-value storage
- X fields with Y data size per field
### 1.4 Built-in protocol support for custom tokens
- Elrond Standard Digital Token - Fungible, Semi-fungible, Non-fungible
- Transfer cost: payload cost for id & quantity
- No smart contract required
- Directly attached to accounts, instead of having them assigned in a third party
##   2. Running smart contracts in a sharded architecture
- Each user account "lives" in a shard
- Each smart contract is also an account that "lives" in a shard
- Both user and SC accounts have their own data trie
- Cross-shard calls are resolved by the protocol
##   3. SC composability in a sharded architecture
- Shards don't have direct access to each other's state
- 2 types of contract-to-contract calls (User > Contract A > Contract B)
    Synchronous calls, Ethereum style
        Only if the contracts are known to be in the same shard
        Happens atomically
        The result of the nested call is available in the calling transaction
    Asynchronous calls
        Shard-agnostic (they work identically in the same shard as cross-shard)
        The answer comes back later as a callback transaction
        Not atomic, the calling contract must handle rollback explicitly in case of failure

##    4. Smart contracts ESDT tokens (Elrond Standard Digital Token)
- ESDT tokens are native (transferred just like the native currency EGLD)
- ESDT ownership stored in account trie (both for SC and EOA)
- No need for ERC-20-style allowance
- Types:
    Fungible
    Semi-fungible or non-fungible. These ones carry additional information.
- Multiple ESDT tokens can be transferred in the same transaction
- Smart contracts can receive and send ESDT tokens
- Smart contracts can keep their state either:
    in contract storage (the default), or
    in semi-fungible ESDT metadata - this can help scalability since ESDT ownership is spread across
    shards in account tries
##   5.  Support for multiple VMs
- The VM adapter allows plugging in any number of VMs
- SC metadata points to the specific VM and VM version
- Only 1 VM currently (Elrond VM), but multiple versions active, to avoid backwards
compatibility issues

## 6. SC execution engine
- We had some attempts in 2019 to port IELE VM to Elrond
    - R worked as a prototype on the first testnet (CryptoBubbles ran on it)
    - Too slow
    - Interpreter-based
- Late 2019 we switched to WebAssembly, specifically
Wasmer
    - Using SinglePass just-in time compilation (safe against JIT bombs)
    - Local caching of SC binaries acts as ahead-of-time compilation
    - Configurable per-opcode metering based on a community prototype
    - Runtime breakpoints (the VM can preemptively stop SC execution)

## 7. Stateless execution
- Smart contracts run sandboxed
- No writes are performed until after the execution is completed (if no errors occur)
## 8. SC primitives in the VM
- SC size is critical for 2 reasons:
    - It contributes to blockchain state size
    - Just-in-time compilation time is dependent on binary size - and happens on each SC call
- The goal: SCs no larger than a few kB in size
- The strategy:
    - Provide all necessary mathematical & crypto operations directly from the VM
    - The VM fulfills the role of a stdlib for contracts
    - Only keep actual business logic in contracts (avoid libraries)
- Managed types
    - Stored in a special heap in the VM during execution
    - Manipulated by contracts via int32 handles that act like "pointers"
    - Their memory managed by the VM, not kept in WASM memory

## 9. Managed types explained
- The types:
    - Biglnt
    - Managed Buffer - arbitrary bytes kept in the VM
    - Elliptic Curve
    - BigFloat- under development
- A contract can deal with them without ever loading them in WASM memory
- Example: a contract that increments a counter by an amount
    - Read argument into big int heap, handle 0
    - Read value from storage, into big int heap, handle 1
    - Add numbers at handles 0 and 1 into handle2
    - Save handle 2 to storage
    - Return number at handle 2
    - During the entire execution the wasm contract never sees any actual value
    - Bigint operations ensure no overflow is possible

## 10. Checking SC/VM correctness
- High-level Rust unit tests using mocks (no VM execution)
    - Debugger
    - High-level coverage
- "Mandos" testing, using the VM
    - JSON-based testing scenarios for smart contracts
    - Also used for testing VM features, but mostly designed for developers
    - Can be integrated into SC fuzzers
- K framework VM implementation by Runtime Verification
    - Based on KWASM
    - Still under development, but basic scenarios already covered
- High level soundness proofs by Runtime Verification
    - Multisig contract modelled and verified

# Deploy Elrond

##  Prepare the set up
1. Install VSCODE
2. Install Elrond IDE extension
3. Ctrl + Shift + P
4. Elrond Setup Workspace
5. Install erdpy 
6. Restart VSCODE
7. From ELROND WORKSPACE FROM LEFT install a template crowdfunding
8. Ignore the folder mycrowdfunding because is a generated folder for a ELROND Project 
9. For example the mycrowdfunding/src/crowdfunding_esdt.rs is the file that requires attention
10. mycrowdfunding/mandos contains the tests with diferent scanario written in json

## Deploy
1. Does NOT work on WINDOWS
2. you must install erdpy (Elrond SDK)
3. erdpy --verbose deps install rust --overwrite
4. erdpy --verbose deps install vmtools --overwrite
5. erdpy --verbose deps install rust --overwrite


## Deploy on testnet 
1. Create a wallet 
```sh
 erdpy --verbose wallet derive alice.pem --mnemonic
```
2. Use the snippet in the interaction folder to deploy on the testnet after you have got some EGLD from faucet
My transaction : https://testnet-explorer.elrond.com/transactions/938a996aebf63724e5024571305a38b3caabac0630db36a958412d0fa76c7181