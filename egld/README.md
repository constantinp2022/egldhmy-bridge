Elrond 
    Overview
        Adaptive State Sharding 
            State Transactions & Network Sharding
            1 Metachain, 3 execution shards
            Dynamically add shards to scale with demand
        Secure proof of State
            BFT-like(Byzantine fault) consensus mechanism
            Random sampling for consensus group
            validators randomly shuffled between shards
            unbiasable randomness source 
        Smart Accounts
            Individual data trie
            Key-value storage
            X fields with Y data size per field
        Built-in protocol support for custom tokens
            Elrond Standard Digital Token - Fungible, Semi-fungible, Non-fungible
            Transfer cost: payload cost for id & quantity
            No smart contract required
            Directly attached to accounts, instead of having them assigned in a third party
            