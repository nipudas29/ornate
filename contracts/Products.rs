use anchor_lang::prelude::*;

declare_id!("9gJdVojkx2iun5S2kDN5c2kK8iBwuwvFMmJHXZrPAYgW");

#[program]
pub mod product_purchase {
    use super::*;

    pub fn purchase_product(ctx: Context<PurchaseProduct>) -> Result<()> {
        let product = &mut ctx.accounts.product;

        // Check if the product is available
        if !product.is_available || product.owner == ctx.accounts.buyer.key() {
            return Err(ErrorCode::InvalidProduct.into());
        }

        // Ensure the seller is the owner of the product
        if product.owner != ctx.accounts.seller.key() {
            return Err(ErrorCode::InvalidSeller.into());
        }

        // Transfer SOL from buyer to seller
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.seller.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, product.price)?;

        // Update product state
        product.is_available = false;

        msg!("Product purchased successfully!");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct PurchaseProduct<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub seller: AccountInfo<'info>,
    #[account(mut)]
    pub product: Account<'info, Product>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct Product {
    pub price: u64,
    pub owner: Pubkey,
    pub is_available: bool,
    pub title: String,
    pub description: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid product state")]
    InvalidProduct,
    #[msg("Invalid seller")]
    InvalidSeller,
}