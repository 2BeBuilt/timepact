// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "lib/forge-std/lib/ds-test/src/test.sol";
import "contracts/ScrollBridge.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract ScrollBridgeTest is DSTest, ERC721Holder {
    ScrollBridge public scrollBridge;

    function setUp() public {
        scrollBridge = new ScrollBridge();
    }

    function testTokenInfo() public {
        scrollBridge.releaseCopy("creatoor", 0, true, address(this), "URI", 0);
        scrollBridge.releaseCopy("creatooor", 0, true, address(this), "URILLLL", 1);
        scrollBridge.balanceOf(address(this));
        uint256 token = scrollBridge.tokenOfOwnerByIndex(address(this), 0);
        (string memory creator, uint64 time, bool filecoin) = scrollBridge.tokenInfo(token);
        assertEq(creator, "creatoor");
        assertEq(time, 0);
        require(filecoin);
        uint256 token2 = scrollBridge.tokenOfOwnerByIndex(address(this), 1);
        (string memory creator2, uint64 time2, ) = scrollBridge.tokenInfo(token2);
        assertEq(creator2, "creatooor");
        assertEq(time2, 0);
    }

    function testreleaseCopy() public {
        scrollBridge.releaseCopy("creatoor", 0, true, address(this), "URI", 0);
        assertEq(scrollBridge.balanceOf(address(this)), 1);
        (string memory creator, uint64 unlock, bool filecoin) = scrollBridge.tokenInfo(0);
        assertEq(creator, "creatoor");
        assertEq(unlock, 0);
        require(filecoin);
        assertEq(scrollBridge.tokenURI(0), "URI");
    }

    function testBridgeToFilecoin() public {
        scrollBridge.releaseCopy("creatoor", 0, false, address(this), "URI", 10);
        scrollBridge.bridgeToFilecoin(10);
        assertEq(scrollBridge.balanceOf(address(this)), 1);
        (string memory creator, uint64 unlock, bool filecoin) = scrollBridge.tokenInfo(10);
        assertEq(creator, "creatoor");
        assertEq(unlock, 0);
        require(!filecoin);
        assertEq(scrollBridge.tokenURI(10), "URI");
        assertEq(scrollBridge.balanceOf(address(this)), 1);
    }

    function testTokenURI() public {}
}
