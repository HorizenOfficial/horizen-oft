import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { TwoWayConfig, generateConnectionsConfig } from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption } from '@layerzerolabs/toolbox-hardhat'

import type { OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'
import 'dotenv/config'

const baseContract: OmniPointHardhat = {
    eid: process.env.TESTNET_DEPLOY == "true"? EndpointId.BASESEP_V2_TESTNET : EndpointId.BASE_V2_MAINNET,
    contractName: 'ZenTokenOFTAdapter',
}

const zenContract: OmniPointHardhat = {
    eid: process.env.TESTNET_DEPLOY == "true"? EndpointId.HORIZEN_V2_TESTNET : EndpointId.HORIZEN_V2_MAINNET,
    contractName: 'ZenTokenOFT',
}

//ONLY FOR MAINNET GAS PROFILING -> first config; then test; change numbrs; repeat config

const lzReceiveGasProfilingA = 110_000; //read this on horizen chain (_lzReceive) after a test transfer from Base to Horizen -> 30% more
const lzReceiveGasProfilingB = 110_000; //read this on base chain (_lzReceive) after a test transfer from Horizen to Base -> 30% more

const EVM_ENFORCED_OPTIONS_A_TO_B: OAppEnforcedOption[] = [
  {
    msgType: 1,
    optionType: ExecutorOptionType.LZ_RECEIVE,
    gas: lzReceiveGasProfilingA,
    value: 0,
  },
  {
    msgType: 2,
    optionType: ExecutorOptionType.LZ_RECEIVE,
    gas: lzReceiveGasProfilingA,
    value: 0,
  },
  {
    msgType: 2,
    optionType: ExecutorOptionType.COMPOSE,
    index: 0,
    gas: lzReceiveGasProfilingA,
    value: 0,
  },
]

const pathways: TwoWayConfig[] = [
    [
        baseContract, // Chain A contract
        zenContract, // Chain B contract
        [['LayerZero Labs'], [[],0]], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
        [3, 3], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS_A_TO_B, EVM_ENFORCED_OPTIONS_A_TO_B,]
    ],
]

export default async function () {
    // Generate the connections config based on the pathways
    const connections = await generateConnectionsConfig(pathways)
    return {
        contracts: [{ contract: baseContract }, { contract: zenContract }],
        connections,
    }
}
