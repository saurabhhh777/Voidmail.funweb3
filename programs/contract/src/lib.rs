use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount, Token, mint_to, MintTo};

declare_id!("9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9");

#[program]
pub mod voidmail_nft {
    use super::*;

    pub fn purchase_credits(
        ctx: Context<PurchaseCredits>,
        credits: u8,
    ) -> Result<()> {
        // Validate credits amount
        require!(credits > 0 && credits <= 10, ErrorCode::InvalidCreditsAmount);
        
        // Calculate required SOL based on credits
        let required_lamports = match credits {
            1 => 25_000_000,  // 0.025 SOL for 1 credit
            2 => 45_000_000,  // 0.045 SOL for 2 credits
            3 => 60_000_000,  // 0.060 SOL for 3 credits
            5 => 90_000_000,  // 0.090 SOL for 5 credits
            10 => 150_000_000, // 0.150 SOL for 10 credits
            _ => return Err(ErrorCode::InvalidCreditsAmount.into())
        };

        let user = &mut ctx.accounts.user;
        let vault = &mut ctx.accounts.vault;

        require!(
            **user.to_account_info().lamports.borrow() >= required_lamports,
            ErrorCode::InsufficientFunds
        );

        // Transfer SOL to vault
        **user.to_account_info().try_borrow_mut_lamports()? -= required_lamports;
        **vault.to_account_info().try_borrow_mut_lamports()? += required_lamports;

        // Emit event for backend tracking
        emit!(CreditsPurchased {
            user: user.key(),
            credits,
            amount: required_lamports,
        });

        msg!("Credits purchased: {} credits for {} lamports", credits, required_lamports);
        Ok(())
    }

    pub fn create_custom_email(
        ctx: Context<CreateCustomEmail>,
        prefix: String,
        domain: String,
    ) -> Result<()> {
        // Validate prefix and domain
        require!(prefix.len() > 0 && prefix.len() <= 50, ErrorCode::InvalidPrefix);
        require!(domain.len() > 0 && domain.len() <= 100, ErrorCode::InvalidDomain);

        // Mint NFT to user
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.payer.to_account_info(),
            },
        );

        mint_to(cpi_ctx, 1)?;

        // Emit event for backend tracking
        emit!(CustomEmailCreated {
            user: ctx.accounts.user.key(),
            prefix,
            domain,
        });

        msg!("Custom Email Minted: {}@{}", prefix, domain);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct PurchaseCredits<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: This is just the vault PDA
    #[account(mut)]
    pub vault: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateCustomEmail<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[event]
pub struct CreditsPurchased {
    pub user: Pubkey,
    pub credits: u8,
    pub amount: u64,
}

#[event]
pub struct CustomEmailCreated {
    pub user: Pubkey,
    pub prefix: String,
    pub domain: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You do not have enough SOL to purchase credits.")]
    InsufficientFunds,
    #[msg("Invalid credits amount. Must be 1, 2, 3, 5, or 10.")]
    InvalidCreditsAmount,
    #[msg("Invalid prefix length.")]
    InvalidPrefix,
    #[msg("Invalid domain length.")]
    InvalidDomain,
}
