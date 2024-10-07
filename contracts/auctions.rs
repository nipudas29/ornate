use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;

declare_id!("9gJdVojkx2iun5S2kDN5c2kK8iBwuwvFMmJHXZrPAYgW");

#[program]
pub mod dutch_auction {
    use super::*;

    pub fn create_auction(
        ctx: Context<CreateAuction>,
        start_price: u64,
        reserve_price: u64,
        duration: i64,
        decrement: u64
    ) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let clock = Clock::get()?;

        auction.seller = ctx.accounts.seller.key();
        auction.start_price = start_price;
        auction.current_price = start_price;
        auction.reserve_price = reserve_price;
        auction.start_time = clock.unix_timestamp;
        auction.end_time = clock.unix_timestamp + duration;
        auction.decrement = decrement;
        auction.winner = Pubkey::default();
        auction.is_active = true;

        Ok(())
    }

    pub fn place_bid(ctx: Context<PlaceBid>) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let bidder = &ctx.accounts.bidder;
        let clock = Clock::get()?;

        require!(auction.is_active, ErrorCode::AuctionEnded);
        require!(clock.unix_timestamp <= auction.end_time, ErrorCode::AuctionEnded);

        // Calculate current price
        let elapsed_time = clock.unix_timestamp - auction.start_time;
        let price_reduction = (elapsed_time as u64) * auction.decrement;
        let current_price = auction.start_price.saturating_sub(price_reduction);

        require!(current_price >= auction.reserve_price, ErrorCode::ReservePriceNotMet);

        // Transfer funds from bidder to seller
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: bidder.to_account_info(),
                to: ctx.accounts.seller.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, current_price)?;

        // Update auction state
        auction.winner = bidder.key();
        auction.is_active = false;

        msg!("Auction won by {:?} at price {}", bidder.key(), current_price);

        Ok(())
    }

    pub fn end_auction(ctx: Context<EndAuction>) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let clock = Clock::get()?;

        require!(auction.is_active, ErrorCode::AuctionAlreadyEnded);
        require!(clock.unix_timestamp > auction.end_time, ErrorCode::AuctionStillActive);

        auction.is_active = false;
        msg!("Auction ended without a winner");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAuction<'info> {
    #[account(init, payer = seller, space = 8 + 32 + 8 + 8 + 8 + 8 + 8 + 8 + 32 + 1)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceBid<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    #[account(mut)]
    pub bidder: Signer<'info>,
    /// CHECK: This is safe because we're just transferring to this account
    #[account(mut)]
    pub seller: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct EndAuction<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    pub seller: Signer<'info>,
}

#[account]
pub struct Auction {
    pub seller: Pubkey,
    pub start_price: u64,
    pub current_price: u64,
    pub reserve_price: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub decrement: u64,
    pub winner: Pubkey,
    pub is_active: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The auction has already ended")]
    AuctionEnded,
    #[msg("The auction is still active")]
    AuctionStillActive,
    #[msg("The reserve price has not been met")]
    ReservePriceNotMet,
}