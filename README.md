# **Ornate: Decentralized Luxury Fashion Marketplace**

Welcome to **Ornate**, a decentralized marketplace where luxury fashion meets blockchain. Designers can list exclusive products, and users can buy or bid on these items using cryptocurrencies, all in a secure and transparent environment built on the Solana blockchain.

---

## **Overview**

**Ornate** is a two-sided marketplace that bridges the gap between designers and consumers by leveraging blockchain technology. Designers can upload their fashion products, including exclusive luxury items for auction, while users can buy or bid using SOL or other cryptocurrencies. The platform uses a **Dutch Auction** model for live bidding and offers categories for all types of luxury and fashion accessories.

![image](https://github.com/user-attachments/assets/35fb4799-b022-441b-bf97-ed80460390bc)  

---

## **Key Features**

- **Decentralized Platform**: Built on Solana, offering fast and low-cost transactions.
- **Exclusive Auctions**: Dutch auction model for limited-edition fashion items, where the price decreases over time.
- **Crypto Payments**: Users can purchase fashion items using SOL and, in the future, other cryptocurrencies.
- **Digital and Physical Ownership**: Both physical luxury items and NFTs representing digital assets.
- **Provenance and Authenticity**: Blockchain ensures authenticity, ownership history, and scarcity of each listed item.
- **Designer and User-Friendly**: Simple interface for designers to list items and for users to browse and purchase.

---

## **Technology Stack**

- **Blockchain**: Solana
- **Smart Contracts**: Rust & Anchor framework for on-chain logic
- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Database**: MongoDB for off-chain data (product listings, user profiles)
- **Payments**: Solana for fast and secure crypto transactions
- **Auction Model**: Dutch Auction for exclusive items

---

## **Getting Started**

### **Prerequisites**

- Install [Node.js](https://nodejs.org/)
- Install [Rust](https://www.rust-lang.org/)
- Install [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- Install [Anchor](https://book.anchor-lang.com/chapter_1/installation.html)

### **Installation**

1. **Clone the repository**:
   ```
   git clone https://github.com/your-repo/ornate.git
   cd ornate
   ```

2. **Install dependencies**:
   ```
   npm install        # For the frontend and backend
   ```

3. **Set up environment variables**:
   Copy the `.env.example` to `.env` and configure your environment variables:
   ```
   cp .env.example .env
   ```

4. **Start the development environment**:
   - Run the frontend:
     ```
     npm run dev
     ```
   - Run the backend:
     ```
     cd backend
     npm start
     ```

5. **Deploy Smart Contracts**:
   Compile and deploy smart contracts to the Solana blockchain:
   ```
   cd contracts
   anchor build
   anchor deploy
   ```

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**

For questions or support, please reach out at:

- Email: ornatefree@gmail.com
- Twitter: [@OrnateMarketplace](https://x.com/ornate__)

---

**Ornate** – Elevating fashion with blockchain.
