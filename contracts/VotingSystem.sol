// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract VotingSystem {
    using Counters for Counters.Counter;

    Counters.Counter public _electionID;
    Counters.Counter public _candidateID;
    Counters.Counter public _voterID;

    // for who creates election, they are the chairperson
    address public election_owner;

    struct Election {
        uint256 election_id;
        string election_title;
        string election_description;
        address election_owner_address; // the owner of this election
        string name;
    }

    event ElectionCreated(
        uint256 indexed election_id,
        string election_title,
        string election_description,
        address election_owner, // the owner of this election
        string name
    );

    struct Candidate {
        uint256 candidate_id;
        uint256 election_id; // which election candidate
        string name;
        address candidate_address;
        uint256 candidate_vote_count; // votes obtained
    }

    event CandidateCreated(
        uint256 indexed candidate_id,
        uint256 election_id, // which election candidate
        string name,
        address candidate_address,
        uint256 candidate_vote_count // votes obtained
    );

    struct Voter {
        uint256 voter_id;
        uint256 election_id; // which election voter
        string name;
        address voter_address;
        bool voter_voted; // did you vote
        uint256 voter_weight; // how many votes are available
        uint256 voter_vote; // For tracking vote
    }

    event VoterCreated(
        uint256 indexed voter_id,
        uint256 election_id, // which election voter
        string name,
        address voter_address,
        bool voter_voted, // did you vote
        uint256 voter_weight, // how many votes are available
        uint256 voter_vote // For tracking vote
    );

    address[] public electionADD;
    address[] public candidateAddress;
    address[] public voterAddress;
    mapping(uint256 => Election) public elections;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => Voter) public voters;

    constructor() {
        election_owner = msg.sender;
    }

    //create a Election
    function CreateElection(
        string memory _election_title,
        string memory _election_description,
        string memory _name
    ) public {
        require(
            bytes(_election_title).length > 0,
            "Election Title is required"
        );
        require(
            bytes(_election_description).length > 0,
            "Election Description is required"
        );
        require(bytes(_name).length > 0, "Election Owner Name is required");

        _electionID.increment();

        uint256 idNumber = _electionID.current();
        Election storage election = elections[idNumber];

        election.election_id = idNumber;
        election.election_title = _election_title;
        election.election_description = _election_description;
        election.election_owner_address = msg.sender; // Set the owner to the sender of this transaction
        election.name = _name;

        // If the length of the array is less than idNumber, extend the array
        if (electionADD.length < idNumber) {
            electionADD.push(msg.sender);
        } else {
            electionADD[idNumber - 1] = msg.sender;
        }

        emit ElectionCreated(
            idNumber,
            _election_title,
            _election_description,
            msg.sender,
            _name
        );
    }

    //get information of Election
    function getElections()
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            string[] memory,
            address[] memory,
            string[] memory
        )
    {
        uint256[] memory idE = new uint256[](_electionID.current());
        string[] memory titles = new string[](_electionID.current());
        string[] memory descriptions = new string[](_electionID.current());
        address[] memory owners = new address[](_electionID.current());
        string[] memory names = new string[](_electionID.current());

        for (uint256 i = 0; i < _electionID.current(); i++) {
            Election storage election = elections[i + 1];
            idE[i] = election.election_id;
            titles[i] = election.election_title;
            descriptions[i] = election.election_description;
            owners[i] = election.election_owner_address;
            names[i] = election.name;
        }

        return (idE, titles, descriptions, owners, names);
    }

    // Create a Candidate
    function createCandidate(
        uint256 _election_id,
        string memory _name,
        address _candidate_address
    ) public {
        require(bytes(_name).length > 0, "Candidate name is required");
        require(
            _candidate_address != address(0),
            "Candidate address is required"
        );
        require(
            _election_id > 0 && _election_id <= _electionID.current(),
            "Invalid election ID"
        );

        Election storage election = elections[_election_id];
        require(
            election.election_owner_address == msg.sender,
            "Only the owner of the election can add a candidate"
        );
        require(election.election_id != 0, "Invalid election ID");

        _candidateID.increment();

        uint256 idNumber = _candidateID.current();
        Candidate storage candidate = candidates[idNumber];

        candidate.candidate_id = idNumber;
        candidate.election_id = _election_id;
        candidate.name = _name;
        candidate.candidate_address = _candidate_address;
        candidate.candidate_vote_count = 0;

        emit CandidateCreated(
            idNumber,
            _election_id,
            _name,
            _candidate_address,
            0
        );
        candidateAddress.push(_candidate_address);
    }

    // Get candidates by election ID
    function getCandidatesByElection(uint256 _election_id)
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            address[] memory,
            uint256[] memory
        )
    {
        require(
            _election_id > 0 && _election_id <= _electionID.current(),
            "Invalid election ID"
        );

        uint256 candidateCount = 0;
        for (uint256 i = 1; i <= _candidateID.current(); i++) {
            if (candidates[i].election_id == _election_id) {
                candidateCount++;
            }
        }

        uint256[] memory ids = new uint256[](candidateCount);
        string[] memory names = new string[](candidateCount);
        address[] memory addresses = new address[](candidateCount);
        uint256[] memory voteCounts = new uint256[](candidateCount);

        uint256 index = 0;
        for (uint256 i = 1; i <= _candidateID.current(); i++) {
            if (candidates[i].election_id == _election_id) {
                ids[index] = candidates[i].candidate_id;
                names[index] = candidates[i].name;
                addresses[index] = candidates[i].candidate_address;
                voteCounts[index] = candidates[i].candidate_vote_count;
                index++;
            }
        }

        return (ids, names, addresses, voteCounts);
    }

    // create voter
    function addVoter(
        uint256 _election_id,
        string memory _name,
        address _voter_address
    ) public {
        // Check input validity
        require(bytes(_name).length > 0, "Voter name is required");
        require(_voter_address != address(0), "Voter address is required");
        require(
            _election_id > 0 && _election_id <= _electionID.current(),
            "Invalid election ID"
        );

        Election storage election = elections[_election_id];
        require(
            election.election_owner_address == msg.sender,
            "Only the owner of the election can add a voter"
        );
        require(election.election_id != 0, "Invalid election ID");

        _voterID.increment();

        uint256 idNumber = _voterID.current();
        Voter storage voter = voters[idNumber];

        voter.voter_id = idNumber;
        voter.election_id = _election_id;
        voter.name = _name;
        voter.voter_address = _voter_address;
        voter.voter_voted = false; // initial voting status is false
        voter.voter_weight = 1; // initial voting weight is 1
        voter.voter_vote = 0; // initial vote is 0

        emit VoterCreated(
            idNumber,
            _election_id,
            _name,
            _voter_address,
            false,
            1,
            0
        );
        voterAddress.push(_voter_address);
    }

    //get voter list
    function getVoterByElection(uint256 _election_id)
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            address[] memory,
            uint256[] memory
        )
    {
        require(
            _election_id > 0 && _election_id <= _electionID.current(),
            "Invalid election ID"
        );

        uint256 voterCount = 0;
        for (uint256 i = 1; i <= _voterID.current(); i++) {
            if (voters[i].election_id == _election_id) {
                voterCount++;
            }
        }

        uint256[] memory ids = new uint256[](voterCount);
        string[] memory names = new string[](voterCount);
        address[] memory addresses = new address[](voterCount);
        uint256[] memory weight = new uint256[](voterCount);

        uint256 index = 0;
        for (uint256 i = 1; i <= _voterID.current(); i++) {
            if (voters[i].election_id == _election_id) {
                ids[index] = voters[i].voter_id;
                names[index] = voters[i].name;
                addresses[index] = voters[i].voter_address;
                weight[index] = voters[i].voter_weight;
                index++;
            }
        }
        return (ids, names, addresses, weight);
    }

    function vote(
        uint256 _election_id,
        uint256 _candidate_id,
        uint256 _voter_id
    ) public {
        // Check input validity
        require(
            _election_id > 0 && _election_id <= _electionID.current(),
            "Invalid election ID"
        );

        // Get voter's information
        Voter storage voter = voters[_voter_id];
        require(voter.voter_id != 0, "Voter not found");
        require(
            msg.sender == voter.voter_address,
            "You are not authorized to vote in this election"
        );
        require(
            voter.election_id == _election_id,
            "Voter not in this election"
        );
        require(!voter.voter_voted, "Already voted");

        // Get candidate's information
        Candidate storage candidate = candidates[_candidate_id];
        require(candidate.candidate_id != 0, "Invalid candidate");
        require(
            candidate.election_id == _election_id,
            "Candidate not in this election"
        );

        // Vote for the candidate
        voter.voter_voted = true;
        voter.voter_vote = _candidate_id;

        // Update candidate's vote count
        candidate.candidate_vote_count += voter.voter_weight;

        // Set voter's weight to 0 after voting
        voter.voter_weight = 0;
    }
}
