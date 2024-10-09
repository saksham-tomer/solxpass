use anchor_lang::prelude::*;

use reclaim::cpi::accounts::VerifyProof;
use reclaim::cpi::verify_proof;
use reclaim::instructions::VerifyProofArgs;
use reclaim::program::Reclaim;
use reclaim::state::ClaimData as ReclaimClaimData;
use reclaim::state::ClaimInfo as ReclaimClaimInfo;
use reclaim::state::SignedClaim as ReclaimSignedClaim;
use reclaim::state::{Epoch, EpochConfig};

declare_id!("");

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct VerifyArgs {
    pub claim_info: ClaimInfo,
    pub signed_claim: SignedClaim,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct SignedClaim {
    pub claim_data: ClaimData,
    pub signatures: Vec<[u8; 65]>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct ClaimInfo {
    pub provider: String,
    pub parameters: String,
    pub context_address: Pubkey,
    pub context_message: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct ClaimData {
    pub identifier: [u8; 32],
    pub owner: String,
    pub timestamp: u32,
    pub epoch_index: u32,
}

#[account]
#[derive(Default)]
pub struct StoredClaim {
    pub claim_info: ClaimInfo,
    pub signed_claim: SignedClaim,
    pub owner: Pubkey,
}

#[program]
pub mod base {
    use super::*;

    pub fn verify_and_store(
        ctx: Context<VerifyAndStore>,
        args: VerifyArgs,
    ) -> Result<()> {
        let VerifyArgs {
            claim_info,
            signed_claim,
        } = args;

        let signer_account_info = ctx.accounts.signer.to_account_info();
        let reclaim_program_info = ctx.accounts.reclaim_program.to_account_info();

        let epoch_config_account_info = ctx.accounts.epoch_config.to_account_info();
        let epoch_account_info = ctx.accounts.epoch.to_account_info();

        verify_proof(
            CpiContext::new(
                reclaim_program_info,
                VerifyProof {
                    epoch_config: epoch_config_account_info,
                    epoch: epoch_account_info,
                    signer: signer_account_info,
                },
            ),
            VerifyProofArgs {
                claim_info: ReclaimClaimInfo {
                    parameters: claim_info.parameters.clone(),
                    context_message: claim_info.context_message.clone(),
                    provider: claim_info.provider.clone(),
                    context_address: claim_info.context_address,
                },
                signed_claim: ReclaimSignedClaim {
                    claim_data: ReclaimClaimData {
                        epoch_index: signed_claim.claim_data.epoch_index,
                        timestamp: signed_claim.claim_data.timestamp,
                        identifier: signed_claim.claim_data.identifier,
                        owner: signed_claim.claim_data.owner.clone(),
                    },
                    signatures: signed_claim.signatures.clone(),
                },
            },
        )?;

        let stored_claim = &mut ctx.accounts.stored_claim;
        stored_claim.claim_info = claim_info;
        stored_claim.signed_claim = signed_claim;
        stored_claim.owner = ctx.accounts.signer.key();

        Ok(())
    }

    pub fn get_stored_claim(ctx: Context<GetStoredClaim>) -> Result<()> {

        Ok(())
    }
}

#[derive(Accounts)]
pub struct VerifyAndStore<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub epoch_config: Account<'info, EpochConfig>,
    pub epoch: Account<'info, Epoch>,
    pub reclaim_program: Program<'info, Reclaim>,
    #[account(
        init,
        payer = signer,
        space = 8 + std::mem::size_of::<StoredClaim>(),
        seeds = [b"stored_claim", signer.key().as_ref()],
        bump
    )]
    pub stored_claim: Account<'info, StoredClaim>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetStoredClaim<'info> {
    pub signer: Signer<'info>,
    #[account(
        seeds = [b"stored_claim", signer.key().as_ref()],
        bump
    )]
    pub stored_claim: Account<'info, StoredClaim>,
}