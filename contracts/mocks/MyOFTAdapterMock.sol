// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { ZenTokenOFTAdapter } from "../ZenTokenOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract MyOFTAdapterMock is ZenTokenOFTAdapter {
    constructor(address _token, address _lzEndpoint, address _delegate) ZenTokenOFTAdapter(_token, _lzEndpoint, _delegate) {}
}
