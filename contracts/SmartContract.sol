pragma solidity ^0.4.7;

contract SmartContract {
    address public owner;
    uint proposalCount;
    uint voterCount;
    bool start;
    bool end;

    // constructor..

    function SmartContract() public {
        owner = msg.sender;
        proposalCount = 0;
        voterCount = 0;
        start = false;
        end = false;
    }

    function getOwner() public view returns(address){
        return owner;
    }
    // modifiers are used to modify the behaviour of a function.
    modifier onlyAdmin(){
        require(msg.sender == owner); 
        _; // added in a modifier, to set when to execute the function
        // here it will execute after the require has been fulfilled.
    }

    struct Proposal{
        string name;
        string proposal;
        uint voteCount;
    }

    mapping(uint => Proposal) public proposals;

    // add proposal

    function addProposal(string _name,string _proposal) public  {
        Proposal memory newProposal = Proposal({
            name: _name,
            proposal: _proposal,
            voteCount: 0
        });
        proposals[proposalCount] = newProposal;
        proposalCount += 1;
    }
    // get number of proposals

    function getProposals() public view returns(uint){
        return proposalCount;
    }

    function getAllProposals(uint _count) public view returns(string){
            return proposals[_count].proposal;
    }

    //     function verifyVoter(address _address) public onlyAdmin {
    //     voterDetails[_address].isVerified = true;
    // }

    struct Voter{
        address voterAddress;
        string name;
        bool hasVoted;
        bool isVerified;
    }

    address[] public voters;
    mapping(address => Voter) public voterDetails;

    // request to be added as a voter..

    function requestVoter(string _name) public {
        Voter memory newVoter = Voter({
            voterAddress : msg.sender,
            name : _name,
            hasVoted : false,
            isVerified: false
        });

        voterDetails[msg.sender] = newVoter; // msg.sender address is mapped to the newVoter object.
        voters.push(msg.sender);
        voterCount +=1;
    }

    // get total number of voters..

    function getVoterCount() public view returns(uint){
        return voterCount;
    }

    function verifyVoter(address _address) public onlyAdmin {
        voterDetails[_address].isVerified = true;
    }

    function vote(uint candidateId) public {
        require(voterDetails[msg.sender].hasVoted == false);
        require(voterDetails[msg.sender].isVerified == true);
        require(start == true);
        require(end == false);

        proposals[candidateId].voteCount += 1;
        voterDetails[msg.sender].hasVoted = true;
    }

    function startElection() public onlyAdmin {
        start = true;
        end = false;
    }

    function getStart() public view returns(bool){
        return start;
    }

    function getEnd() public view returns(bool){
        return end;
    }
}