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

ZEN_OFT_NAME=tZEN
ZEN_OFT_SYMBOL=tZEN
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
✔ Which deploy script tags would you like to use? … MyOFT
info:    Will deploy 1 network: binance-testnet
info:    Will use deploy scripts tagged with MyOFT
✔ Do you want to continue? … yes
Network: binance-testnet
Deployer: 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
Deploying ZenTokenOFT with name: tZEN, symbol: tZEN
Deployed contract: ZenTokenOFT, network: binance-testnet, address: 0x4103CabEc5C7d1Ed9387cBEf42B83dbA37F6e493
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


# Transfer tests 
Due to the lack of tZEN on Base Testnet, this test was executed on another instance of the OFT Adapter using a different ERC20 token (a mintable mocked one). The procedure is the same that is needed to transfer with `ZenTokenOFT` and `ZenTokenOFTAdapter` if testnet ZEN is owned
## 4. Test transfer Base -> BSC
```
npx hardhat lz:oft:send  --src-eid 40245 --dst-eid 40102 --amount 1 --to 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
```

```
info:    OFT Adapter detected - checking ERC20 allowance...
info:    Current allowance: 0
info:    Required amount: 1000000000000000000
info:    Insufficient allowance - approving ERC20 tokens...
info:    Approval transaction hash: 0xa9a6e35da59d094416df2cd67ef46b3ad3e090e1bbcce3c86b9b2b7e51c9bbe8
info:    ERC20 approval confirmed
info:    Quoting the native gas cost for the send transaction...
info:    Sending the transaction...
info:     Successfully sent 1 tokens from basesep-testnet to bsc-testnet
info:     Explorer link for source chain basesep-testnet: https://sepolia.basescan.org/tx/0x7e74c7edc8815976db345b2006b686874f2e874b65110637a127ddd4a806075d
info:     LayerZero Scan link for tracking all cross-chain transaction details: https://testnet.layerzeroscan.com/tx/0x7e74c7edc8815976db345b2006b686874f2e874b65110637a127ddd4a806075d
```

## 5. Test transfer BSC -> Base
```
npx hardhat lz:oft:send  --src-eid 40102 --dst-eid 40245 --amount 0.5 --to 0x0699DD23d5b90Ef74777B2a0390ef6bABB9d55b4
```
```
info:    Quoting the native gas cost for the send transaction...
info:    Sending the transaction...
info:     Successfully sent 0.5 tokens from bsc-testnet to basesep-testnet
info:     Explorer link for source chain bsc-testnet: https://testnet.bscscan.com/tx/0xc64f33dbfebcfb5dc573bb856a3d921af3b3f50e4d292e365a86ea73de04294f
info:     LayerZero Scan link for tracking all cross-chain transaction details: https://testnet.layerzeroscan.com/tx/0xc64f33dbfebcfb5dc573bb856a3d921af3b3f50e4d292e365a86ea73de04294f
```
