use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use anchor_lang::solana_program::pubkey::Pubkey;
use anchor_lang::solana_program::hash::hash;
use anchor_lang::solana_program::program_pack::Pack;
use reclaim::state::{EpochConfig, Epoch};
use reclaim::program::Reclaim;
use base::{VerifyArgs, ClaimInfo, SignedClaim, ClaimData};

use crate::base;

#[cfg(test)]
mod tests {
    use super::*;
    use anchor_lang::solana_program::instruction::Instruction;
    use solana_program_test::*;
    use solana_sdk::{signature::Keypair, transaction::Transaction};

    #[tokio::test]
    async fn test_verify_and_store() {
        let program_id = base::id();
        let mut program_test = ProgramTest::new(
            "base",
            program_id,
            processor!(base::entry),
        );

        program_test.add_program("reclaim", reclaim::id(), None);

        let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

        let signer = Keypair::new();
        let epoch_config = Keypair::new();
        let epoch = Keypair::new();

        let (stored_claim, _) = Pubkey::find_program_address(
            &[b"stored_claim", signer.pubkey().as_ref()],
            &program_id,
        );

        let verify_args = VerifyArgs {
            claim_info: ClaimInfo {
                provider: "Test Provider".to_string(),
                parameters: "Test Parameters".to_string(),
                context_address: Pubkey::new_unique(),
                context_message: "Test Message".to_string(),
            },
            signed_claim: SignedClaim {
                claim_data: ClaimData {
                    identifier: [0; 32],
                    owner: "Test Owner".to_string(),
                    timestamp: 12345,
                    epoch_index: 1,
                },
                signatures: vec![[0; 65]],
            },
        };

        let ix = Instruction::new_with_borsh(
            program_id,
            &base::instruction::VerifyAndStore { args: verify_args },
            vec![
                AccountMeta::new(signer.pubkey(), true),
                AccountMeta::new_readonly(epoch_config.pubkey(), false),
                AccountMeta::new_readonly(epoch.pubkey(), false),
                AccountMeta::new_readonly(reclaim::id(), false),
                AccountMeta::new(stored_claim, false),
                AccountMeta::new_readonly(system_program::id(), false),
            ],
        );

        let mut transaction = Transaction::new_with_payer(&[ix], Some(&payer.pubkey()));
        transaction.sign(&[&payer, &signer], recent_blockhash);

        banks_client.process_transaction(transaction).await.unwrap();

        let stored_claim_account = banks_client.get_account(stored_claim).await.unwrap().unwrap();
        let stored_claim_data = base::StoredClaim::try_deserialize(&mut &stored_claim_account.data[..]).unwrap();

        assert_eq!(stored_claim_data.claim_info.provider, "Test Provider");
        assert_eq!(stored_claim_data.signed_claim.claim_data.owner, "Test Owner");
        assert_eq!(stored_claim_data.owner, signer.pubkey());
    }

    #[tokio::test]
    async fn test_get_stored_claim() {

        let ix = Instruction::new_with_borsh(
            program_id,
            &base::instruction::GetStoredClaim {},
            vec![
                AccountMeta::new(signer.pubkey(), true),
                AccountMeta::new_readonly(stored_claim, false),
            ],
        );

        let mut transaction = Transaction::new_with_payer(&[ix], Some(&payer.pubkey()));
        transaction.sign(&[&payer, &signer], recent_blockhash);

        banks_client.process_transaction(transaction).await.unwrap();

        let stored_claim_account = banks_client.get_account(stored_claim).await.unwrap().unwrap();
        let stored_claim_data = base::StoredClaim::try_deserialize(&mut &stored_claim_account.data[..]).unwrap();

    }
}