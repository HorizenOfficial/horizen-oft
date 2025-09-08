# Adapter test on Base and BSC Testnets

This repo has been created with the command: 
```
npx create-lz-oapp@latest --example oft-adapter
```

Used `.env`
```
# You don't need to set both of these values, just pick the one that you prefer and set that one
MNEMONIC=
PRIVATE_KEY=<<redacted>>

# real testnet zen on Base sepolia
ERC20_TO_ADAPT=0x107fde93838e3404934877935993782f977324bb

ZEN_OFT_NAME=oftZEN
ZEN_OFT_SYMBOL=oftZEN

# for verification on etherscan (optional)
ETHERSCAN_API_KEY=<<redacted>>
```

## 1. Deploy ZenTokenOFTAdapter on Base
```
npx hardhat lz:deploy
```
```

    ╭─────────────────────────────────────────╮
    │       ▓▓▓ LayerZero DevTools ▓▓▓        │
    │  ═══════════════════════════════════    │
    │          /*\                            │
    │         /* *\     BUILD ANYTHING        │
    │         ('v')                           │
    │        //-=-\\    ▶ OMNICHAIN           │
    │        (\_=_/)                          │
    │         ^^ ^^                           │
    │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
    ╰─────────────────────────────────────────╯
info:    Compiling your hardhat project
Nothing to compile
✔ Which networks would you like to deploy? › base-testnet
✔ Which deploy script tags would you like to use? … ZenTokenOFTAdapter
info:    Will deploy 1 network: base-testnet
info:    Will use deploy scripts tagged with ZenTokenOFTAdapter
✔ Do you want to continue? … yes
Network: base-testnet
Deployer: 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
Adapting token address: 0x107fde93838e3404934877935993782f977324bb
Deployed contract: ZenTokenOFTAdapter, network: base-testnet, address: 0x689FCE894D68013EDd9fAbcaD565E7d407C6B85F
info:    ✓ Your contracts are now deployed
```

## 2. Deploy ZenTokenOFT on BSC
```
npx hardhat lz:deploy
```
```

    ╭─────────────────────────────────────────╮
    │       ▓▓▓ LayerZero DevTools ▓▓▓        │
    │  ═══════════════════════════════════    │
    │          /*\                            │
    │         /* *\     BUILD ANYTHING        │
    │         ('v')                           │
    │        //-=-\\    ▶ OMNICHAIN           │
    │        (\_=_/)                          │
    │         ^^ ^^                           │
    │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
    ╰─────────────────────────────────────────╯
info:    Compiling your hardhat project
Nothing to compile
✔ Which networks would you like to deploy? › binance-testnet
✔ Which deploy script tags would you like to use? … ZenTokenOFT
info:    Will deploy 1 network: binance-testnet
info:    Will use deploy scripts tagged with MyOFT
✔ Do you want to continue? … yes
Network: binance-testnet
Deployer: 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
Deploying ZenTokenOFT with name: oftZEN, symbol: oftZEN
Deployed contract: ZenTokenOFT, network: binance-testnet, address: 0x798d463bf01211e9F937Ae606c21c35868291c0a
info:    ✓ Your contracts are now deployed
```

## 3. Link Contracts

```
npx hardhat lz:oapp:wire --oapp-config layerzero.config.ts
```

```
[...]
info:    Successfully sent 12 transactions
info:    ✓ Your OApp is now configured
```
Note: in this phase, some transactions failed because they were sent too fast and the RPC node interpreted as replacement transactions but with not enough replacement fee. When a transaction fails, the CLI asks you to retry them, and after a few retry they completed successfully.

## 4. Verification on Base
```
npx hardhat verify --contract contracts/ZenTokenOFTAdapter.sol:ZenTokenOFTAdapter --network base-testnet 0x689FCE894D68013EDd9fAbcaD565E7d407C6B85F "0x107fde93838e3404934877935993782f977324bb" "0x6EDCE65403992e310A62460808c4b910D972f10f" "0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4"
```
where: 
- `0x689FCE894D68013EDd9fAbcaD565E7d407C6B85F` is the deployed address
- `"0x107fde93838e3404934877935993782f977324bb"` is the token to adapt address
- `"0x6EDCE65403992e310A62460808c4b910D972f10f"` is the Endpoint V2 Address on Base (https://docs.layerzero.network/v2/deployments/deployed-contracts?chains=base-sepolia%2Cbsc-testnet)
- `"0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4"` is the owner/deployer address

```
Successfully submitted source code for contract
contracts/ZenTokenOFTAdapter.sol:ZenTokenOFTAdapter at 0x689FCE894D68013EDd9fAbcaD565E7d407C6B85F
for verification on the block explorer. Waiting for verification result...

Successfully verified contract ZenTokenOFTAdapter on the block explorer.
https://sepolia.basescan.org/address/0x689FCE894D68013EDd9fAbcaD565E7d407C6B85F#code
```
## 5. Verification on BSC
```
npx hardhat verify --contract contracts/ZenTokenOFT.sol:ZenTokenOFT --network binance-testnet 0x798d463bf01211e9F937Ae606c21c35868291c0a "oftZEN" "oftZEN" "0x6EDCE65403992e310A62460808c4b910D972f10f" "0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4"
```
where: 
- `0x798d463bf01211e9F937Ae606c21c35868291c0a` is the deployed address
- (first) `"oftZen"` is the name of the deployed token
- (second) `"oftZen"` is the symbol of the deployed token
- `"0x6EDCE65403992e310A62460808c4b910D972f10f"` is the Endpoint V2 Address on BSC (https://docs.layerzero.network/v2/deployments/deployed-contracts?chains=base-sepolia%2Cbsc-testnet)
- `"0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4"` is the owner/deployer address

```
Successfully submitted source code for contract
contracts/ZenTokenOFT.sol:ZenTokenOFT at 0x798d463bf01211e9F937Ae606c21c35868291c0a
for verification on the block explorer. Waiting for verification result...

Successfully verified contract ZenTokenOFT on the block explorer.
https://testnet.bscscan.com/address/0x798d463bf01211e9F937Ae606c21c35868291c0a#code
```

# Transfer tests 

## Test transfer Base -> BSC
```
npx hardhat lz:oft:send  --src-eid 40245 --dst-eid 40102 --amount 0.1 --to 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
```

```
info:    OFT Adapter detected - checking ERC20 allowance...
info:    Current allowance: 0
info:    Required amount: 100000000000000000
info:    Insufficient allowance - approving ERC20 tokens...
info:    Approval transaction hash: 0x4fe3f4cb13ea782a76519e7282a9e85e9956d4b26813a9568ad5c1d520c4f0f7
info:    ERC20 approval confirmed
info:    Quoting the native gas cost for the send transaction...
info:    Sending the transaction...
info:     Successfully sent 0.1 tokens from basesep-testnet to bsc-testnet
info:     Explorer link for source chain basesep-testnet: https://sepolia.basescan.org/tx/0x4762d207359fc2899d94216b337968ff55d85d55cc8813f8b7e8c821bdc8f8f2
info:     LayerZero Scan link for tracking all cross-chain transaction details: https://testnet.layerzeroscan.com/tx/0x4762d207359fc2899d94216b337968ff55d85d55cc8813f8b7e8c821bdc8f8f2
```

## Test transfer BSC -> Base
```
npx hardhat lz:oft:send  --src-eid 40102 --dst-eid 40245 --amount 0.08 --to 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
```
```
info:    Quoting the native gas cost for the send transaction...
info:    Sending the transaction...
info:     Successfully sent 0.08 tokens from bsc-testnet to basesep-testnet
info:     Explorer link for source chain bsc-testnet: https://testnet.bscscan.com/tx/0x0ab78143cef145cb4a102a063c1cabe960ca2b92d46c4f07551187d085114ed1
info:     LayerZero Scan link for tracking all cross-chain transaction details: https://testnet.layerzeroscan.com/tx/0x0ab78143cef145cb4a102a063c1cabe960ca2b92d46c4f07551187d085114ed1
```
