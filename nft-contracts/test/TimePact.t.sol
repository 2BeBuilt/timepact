// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "lib/forge-std/lib/ds-test/src/test.sol";
import "contracts/TimePact.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract TimePactTest is DSTest, ERC721Holder {
    TimePact public timePact;

    function setUp() public {
        timePact = new TimePact();
    }

    // //tested without the mock on deal maker for now, passed, commented out for further testing
    function testDealNoClient() public {
        timePact.pact("pcideeee", "creatoor", 1679348802);
        assertEq(timePact.balanceOf(address(this)), 1);
        assertEq(
            timePact.tokenURI(0),
            "ipfs://bafyreidzk5x25hnwj2qsyueplg4k3vgrg7nlflv36xihntpycrgqh7yure/metadata.json"
        );
        //assertEq(timePact.number(), 1); //works with public getter as expected
    }

    function testUnlock() public {
        timePact.pact("pcideeee", "creatoor", 0);
        //vm.warp(2079348802);
        timePact.unlock(0);
        assert(block.timestamp > 0);
        emit log_uint(block.timestamp);
    }

    function testCheckDelete() public {
        timePact.pact("pcideeee", "creatoor", 0);
        assert(timePact.checkDelete(0) == false);
        emit log_uint(block.timestamp + timePact.getDelay());
    }

    function testTokenIdRetrieval() public {
        timePact.pact("pcideeee", "creatoor", 0);
        timePact.pact("pcideeee", "creatoor", 1);
        timePact.balanceOf(address(this));
        uint256 token = timePact.tokenOfOwnerByIndex(address(this), 0);
        (string memory creator, uint64 time, , , ) = timePact.tokenInfo(token);
        assertEq(creator, "creatoor");
        assertEq(time, 0);
        uint256 token2 = timePact.tokenOfOwnerByIndex(address(this), 1);
        (string memory creator2, uint64 time2, , , ) = timePact.tokenInfo(token2);
        assertEq(creator2, "creatoor");
        assertEq(time2, 1);
    }
}
