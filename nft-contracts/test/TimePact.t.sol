// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "lib/forge-std/lib/ds-test/src/test.sol";
import "contracts/TimePact.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "contracts/basic-deal-client/DealClient.sol";
import {MarketTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import {serializeDealProposal, deserializeDealProposal} from "contracts/basic-deal-client/Types.sol";

contract TimePactTest is DSTest, ERC721Holder {
    TimePact public timePact;
    DealClient public client;
    //MockMarket public relay;
    bytes testCID;
    bytes testShortCID;
    bytes testProvider;
    bytes testOtherProvider;

    function setUp() public {
        timePact = new TimePact();
        client = timePact.dealsClient();
        //relay = new MockMarket();
        testCID = hex"000181E2039220206B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B";
        testShortCID = hex"42";
        testProvider = hex"0066";
        testOtherProvider = hex"00EE";
    }

    function createDealRequest() public view returns (DealRequest memory) {
        DealRequest memory request = DealRequest({
            piece_cid: testCID,
            piece_size: 2048,
            verified_deal: false,
            label: "",
            start_epoch: 0,
            end_epoch: 0,
            storage_price_per_epoch: 0,
            provider_collateral: 0,
            client_collateral: 0,
            extra_params_version: 0,
            extra_params: ExtraParamsV1({
                location_ref: "",
                car_size: 0,
                skip_ipni_announce: false,
                remove_unsealed_copy: false
            })
        });
        return request;
    }

    function testTimePact() public {
        timePact.pact("pcideeee", "creatoor", 0);
    }

    function testMakeDealProposalWithTimePact() public {
        require(client.dealsLength() == 0, "Expect no deals");
        //client.makeDealProposal(cDealRequest());
        timePact.pactFilecoin("pcideeerrree", 0, createDealRequest());
        require(client.dealsLength() == 1, "Expect one deal");

        RequestId memory proposalIdSet = client.getProposalIdSet(testCID);
        require(proposalIdSet.valid, "expected to have valid Proposal");
        DealRequest memory deal = client.getDealByIndex(0);
        require(deal.piece_size == 2048, "unexpected cid size in client after setting");

        ProviderSet memory providerSet = client.getProviderSet(testCID);
        require(!providerSet.valid, "should not be valid before a cid is authorized");

        // non-added cid has expected state
        RequestId memory proposalIdSetShort = client.getProposalIdSet(testShortCID);
        require(!proposalIdSetShort.valid, "expected to have valid Proposal");
        ProviderSet memory providerSetShort = client.getProviderSet(testShortCID);
        require(!providerSetShort.valid, "should not be valid before a cid is authorized");
    }

    // //tested without the mock on deal maker for now, passed, commented out for further testing
    function testDealNoClient() public {
        timePact.pact("pcideeee", "creatoor", 126743876124);
        assertEq(timePact.balanceOf(address(this)), 1);
        assertEq(
            timePact.tokenURI(0),
            "ipfs://bafyreic3rh2kbw5ulhlq67nu4e65p37acfitkgqglxhn7o3ima7pstn56m/metadata.json"
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
        timePact.pact("differentpcideeee", "creatoor", 1);
        timePact.balanceOf(address(this));
        uint256 token = timePact.tokenOfOwnerByIndex(address(this), 0);
        (string memory creator, uint64 time, , , , ) = timePact.tokenInfo(token);
        assertEq(creator, "creatoor");
        assertEq(time, 0);
        uint256 token2 = timePact.tokenOfOwnerByIndex(address(this), 1);
        (string memory creator2, uint64 time2, , , , ) = timePact.tokenInfo(token2);
        assertEq(creator2, "creatoor");
        assertEq(time2, 1);
    }
}
