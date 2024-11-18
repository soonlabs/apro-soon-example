# Apro Oracle Price Display

A real-time dashboard that displays verified on-chain prices from the Apro Oracle Service on SOON devnet. Instead of relying on centralized price feeds, this application fetches cryptographically signed and verified price data directly from the SOON devnet.

## Overview

This application provides a live view of prices (BTC and ETH) that are sourced directly from Apro Oracle's on-chain price feeds. Unlike traditional price aggregators that rely on centralized APIs, these prices are:

- Verified on-chain
- Cryptographically signed
- Directly sourced from the SOON devnet

## Features

- Real-time price updates every 2 seconds
- Display of benchmark, ask, and bid prices
- Timestamp for each price update
- Built with modern React and TypeScript
- Uses TanStack Query for efficient data fetching

## Technical Stack

- **Frontend Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data Fetching**: TanStack Query (React Query)
- **Oracle Service**: Apro Oracle on SOON devnet

## Demo

![Apro Oracle Price Display](https://github.com/user-attachments/assets/657c8d68-ccae-4b84-a0b0-23a723a75846)

## Price Feed Details

The application fetches two primary price feeds:

- Bitcoin (BTC) Feed ID: `0x0003665949c883f9e0f6f002eac32e00bd59dfe6c34e92a91c37d6a8322d6489`
- Ethereum (ETH) Feed ID: `0x0003555ace6b39aae1b894097d0a9fc17f504c62fea598fa206cc6f5088e6e45`

Each price report includes:

- Benchmark Price
- Ask Price
- Bid Price
- Timestamp
- Cryptographic signatures
- Configuration digest
- Epoch and round information

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/soonlabs/apro-soon-example

# Install dependencies
pnpm i

# Set up environment variables
cp .env.example .env.local

# Start the development server
pnpm dev
```

### Configuration

Create a `.env.local` file with your Apro Oracle API credentials:

```env
APRO_KEY=your_api_key
```

## Usage

The application automatically fetches and updates prices every 2 seconds. The table displays:

- Asset name (BTC/ETH)
- Current benchmark price
- Ask price
- Bid price
- Last update time

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

## Acknowledgments

- Apro Oracle for providing secure, on-chain price feeds
- SOON devnet for the blockchain infrastructure
- shadcn/ui for the component library
- TanStack Query for efficient data fetching
