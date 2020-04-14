pragma solidity ^0.5.0;

contract ImageHashes {
    struct Image {
        uint id;
        address owner;
        uint vote;
        string hash;
    }
    uint public count;
    uint public peopleVoted;
    mapping(uint=>Image) public images;
    mapping(uint=>address) alreadyVoted;
    constructor() public {
        count = 0;
        peopleVoted = 0;
    }
    function addImage(string memory _hash) public {
        images[count] = Image(count,msg.sender,0,_hash);
        count += 1;
    }
    function voteImage(uint _id) public {
        uint temp = 0;
        for(uint i = 0; i < peopleVoted; i++) {
            if(alreadyVoted[i] == msg.sender) {
                temp += 1;
            }
        }
        require(temp == 0);
        require(images[_id].owner!= msg.sender);
        images[_id].vote += 1;
        alreadyVoted[peopleVoted] = msg.sender;
        peopleVoted += 1;
    }
    function getVote(uint _id) public view returns(uint) {
        return images[_id].vote;
    }
    function getHash(uint _id) public view returns(string memory) {
        return images[_id].hash;
    }
    function getCount() public view returns(uint) {
        return count;
    }
}
