#![no_std]

elrond_wasm::imports!();

/// A contract that allows anyone to send a fixed sum, locks it then allows the admin to take it back.
/// Sending funds to the contract is called "deposit".
/// Taking the same funds back is called "withdraw" and can be done only by the admin.
///
/// Restrictions:
/// - Only the set amount can be `deposit`-ed, no more, no less.
/// - `withdraw` can only be called after a certain period after `deposit`.
#[elrond_wasm::contract]
pub trait LockEGLD {
    /// Necessary configuration when deploying:
    /// `deposit_amount` - the exact amount that needs to be sent when `deposit`-ing.  
    #[init]
    fn init(
        &self,
        deposit_amount: BigUint
    ) -> SCResult<()> {
        require!(deposit_amount > 0, "deposit amount cannot be set to zero");
        self.deposit_amount().set(&deposit_amount);

        let token_id = TokenIdentifier::egld();
        self.accepted_payment_token_id().set(&token_id);

        Ok(())
    }

    // endpoints

    /// User sends a fixed amount tokens to be locked in the contract .
    /// Optional `_data` argument is ignored.
    #[payable("*")]
    #[endpoint]
    fn deposit(
        &self,
        #[payment_token] payment_token: TokenIdentifier,
        #[payment_amount] payment_amount: BigUint,
    ) -> SCResult<()> {

        //You can only deposit egld
        require!(
            payment_token == self.accepted_payment_token_id().get(),
            "Invalid payment token"
        );

        //You can only deposit a fixed amount
        require!(
            payment_amount == self.deposit_amount().get(),
            "The payment must match the fixed ping amount"
        );

        //You can only deposit once
        let caller = self.blockchain().get_caller();
        require!(!self.did_user_deposit(&caller), "Already deposit");

        //Set a mapping between the address and the timestamp
        let current_block_timestamp = self.blockchain().get_block_timestamp();
        self.user_deposit(&caller)
            .set(&current_block_timestamp);

        //Everything went fine
        Ok(())
    }

    /// User can take back funds from the contract but only the admin can send a withdraw request.
    #[endpoint]
    fn withdraw(&self,
                address: &ManagedAddress
    ) -> SCResult<()> {

        // Check that who calls this contract function is the owner
        self.blockchain().check_caller_is_owner();

        // Check that the address already deposited
        require!(self.did_user_deposit(&address), "Must deposit first");

        // Check that current timestamp is bigger than deposited timestamp
        // TODO remove
        let current_timestamp = self.blockchain().get_block_timestamp();
        let deposit_timestamp = self.user_deposit(&address).get();
        require!(
            current_timestamp >= deposit_timestamp,
            "Cannot withdraw before deposited timestamp"
        );

        // Remove the address from mapping
        self.user_deposit(&address).clear();

        // Actual Withdraw
        let token_id = self.accepted_payment_token_id().get();
        let amount = self.deposit_amount().get();

        self.send()
            .direct(&address, &token_id, 0, &amount, b"withdraw successful");

        //Everything went fine
        Ok(())
    }

    // views

    #[view(didUserDeposit)]
    fn did_user_deposit(&self, address: &ManagedAddress) -> bool {
        !self.user_deposit(address).is_empty()
    }
    
    // storage

    #[view(getAcceptedPaymentToken)]
    #[storage_mapper("acceptedPaymentTokenId")]
    fn accepted_payment_token_id(&self) -> SingleValueMapper<TokenIdentifier>;

    #[view(getDepositAmount)]
    #[storage_mapper("depositAmount")]
    fn deposit_amount(&self) -> SingleValueMapper<BigUint>;

    #[view(getUserDeposit)]
    #[storage_mapper("userDeposit")]
    fn user_deposit(&self, address: &ManagedAddress) -> SingleValueMapper<u64>;
}
