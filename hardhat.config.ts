// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'
import './tasks/sendOFT'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        'base-testnet': {
            eid: EndpointId.BASESEP_V2_TESTNET,
            url: process.env.RPC_URL_BASE_SEPOLIA || 'https://sepolia.base.org',
            accounts,
            oftAdapter: {
              tokenAddress: process.env.ERC20_TO_ADAPT! // Set the token address for the OFT adapter
            },
        },
        'base-mainnet': {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE_MAINNET || 'https://mainnet.base.org',
            accounts,
            oftAdapter: {
              tokenAddress: process.env.ERC20_TO_ADAPT! // Set the token address for the OFT adapter
            },
        },
        'binance-testnet': {
            eid: EndpointId.BSC_V2_TESTNET,
            url: process.env.RPC_URL_BNB_TESTNET || 'https://bsc-testnet.drpc.org',
            accounts,
        },
        'zen-testnet': {
            eid: EndpointId.HORIZEN_TESTNET,
            url: process.env.RPC_URL_ZEN_TESTNET || 'https://horizen-testnet.rpc.caldera.xyz/http',
            accounts,
        },
        'zen-mainnet': {
            eid: EndpointId.HORIZEN_MAINNET,
            url: process.env.RPC_URL_ZEN_MAINNET || 'https://horizen.calderachain.xyz/http',
            accounts,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "",
    }
}

export default config
