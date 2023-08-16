import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
//Smart Contract Import & ABI
import { VotingAddress, VotingAddressABI } from './context/constrants';
//Import Page
import HomePage from './pages/HomePage';
import Navbar from './compoments/Navbar'
import CreateElection from './pages/CreateElection';
import ElectionList from './pages/ElectionList';
import NotFound from './pages/NotFound';
import CreateCandidate from './pages/CreateCandidate';
import CandidateList from './pages/CandidateList';
import CreateVoter from './pages/CreateVoter';
import VoterList from './pages/VoterList';
import Vote from './pages/Vote';

const App = () => {

  //function link to metamask shortcart
  const fetchContract = (signer) => new ethers.Contract(VotingAddress, VotingAddressABI, signer);

  // MetaMask Setup
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  // Election Setup
  const [electionFormInput, setelectionFormInput] = useState({
    etitle: "",
    edesription: "",
    ownername: ""
  });
  const [electionData, setElectionData] = useState([])
  //setup Candidata
  const [candidateFormInput, setcandidateFormInput] = useState({
    celectionid: "",
    cname: "",
    caddress: ""
  });
  //setup CandidateList
  const [candidateListFormInput, setcandidateListFormInput] = useState({
    checkcandidateListUsingId: "",
  });
  const [candidateData, setcandidateData] = useState([]);
  //setup Voter
  const [voterFormInput, setvoterFormInput] = useState({
    velectionid: "",
    vname: "",
    vaddress: ""
  });
  //Setup VoterList
  const [voterListFormInput, setvoterListFormInput] = useState({
    checkvoterListUsingId: "",
  })
  const [voterData, setvoterData] = useState([]);
  //setup vote
  const [voteFormInput, setvoteFormInput] = useState({
    voteelectionid: "",
    voteaddress: "",
    voteeID: ""
  });

  //Create Election
  async function createElection(electionFormInput) {
    try {
      const { etitle, edesription, ownername } = electionFormInput;
      if (!etitle || !edesription || !ownername) return ("Pls Insert Election Data");
      console.log(etitle, edesription, ownername)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const election = await contract.CreateElection(etitle, edesription, ownername);
      election.wait();
      console.log(election);
    } catch (error) {
      console.log("Error create Election")
    }
  }

  //Election List
  async function getElectionData() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const electionListData = await contract.getElections();

      let newElectionData = []
      for (let i = 0; i < electionListData[0].length; i++) {
        const electionObj = {
          electionId: electionListData[0][i].toString(),
          electionTitle: electionListData[1][i],
          electionDescription: electionListData[2][i],
          ownerAddress: electionListData[3][i],
          ownerName: electionListData[4][i]
        };
        newElectionData.push(electionObj);
      }
      setElectionData(newElectionData)
    } catch (error) {
      console.log("error");
    }
  }

  //Create Candidate
  async function createCandidate(candidateFormInput) {
    try {
      const { celectionid, cname, caddress } = candidateFormInput;
      if (!celectionid || !cname || !caddress) return ("Pls Insert Election Data");
      console.log(celectionid, cname, caddress)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const candidate = await contract.createCandidate(celectionid, cname, caddress);
      candidate.wait();
      console.log(candidate);
    } catch (error) {
      console.log("Error create Candidate")
    }
  }

  //Get Candidate
  async function getCandidateData(candidateListFormInput) {
    try {
      const { checkcandidateListUsingId } = candidateListFormInput;
      if (!checkcandidateListUsingId) return ("Pls Insert Election Id");
      console.log(checkcandidateListUsingId)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const candidateListCheckId = await contract.getCandidatesByElection(checkcandidateListUsingId);
      console.log(candidateListCheckId);

      let newCandidateData = []
      for (let i = 0; i < candidateListCheckId[0].length; i++) {
        const candidateObj = {
          candidateID: candidateListCheckId[0][i].toString(),
          candidateName: candidateListCheckId[1][i],
          candidateAddress: candidateListCheckId[2][i],
          voteCount: candidateListCheckId[3][i].toString(),
        };
        newCandidateData.push(candidateObj);
      }
      setcandidateData(newCandidateData)
      console.log(candidateData);
    } catch (error) {
      console.log("error")
    }
  }

  //Create Voter
  async function createVoter(voterFormInput) {
    try {
      const { velectionid, vname, vaddress } = voterFormInput;
      if (!velectionid || !vname || !vaddress) return ("Pls Insert Election Data");
      console.log(velectionid, vname, vaddress)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const voter = await contract.addVoter(velectionid, vname, vaddress);
      voter.wait();
      console.log(voter);
    } catch (error) {
      console.log("Error create Voter")
    }
  }

  //Get Voter
  async function getVoterData(voterListFormInput) {
    try {
      const { checkvoterListUsingId } = voterListFormInput;
      if (!checkvoterListUsingId) return ("Pls Insert Election Id");
      console.log(checkvoterListUsingId)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const voterListCheckId = await contract.getVoterByElection(checkvoterListUsingId);
      console.log(voterListCheckId);

      let newvoteData = []
      for (let i = 0; i < voterListCheckId[0].length; i++) {
        const voterObj = {
          voterID: voterListCheckId[0][i].toString(),
          voterName: voterListCheckId[1][i],
          voterAddress: voterListCheckId[2][i],
          gotVote: voterListCheckId[3][i].toString(),
        };
        newvoteData.push(voterObj);
      }
      setvoterData(newvoteData)
      console.log(voterData);
    } catch (error) {
      console.log("error")
    }
  }

  //Vote
  async function voteCandiate(voteFormInput) {
    try {
      const { voteelectionid, voteaddress, voteeID } = voteFormInput;
      if (!voteelectionid || !voteaddress || !voteeID) return ("Pls Insert Election Data");
      console.log(voteelectionid, voteaddress, voteeID)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const voteC = await contract.vote(voteelectionid, voteaddress, voteeID);
      voteC.wait();
      console.log(voteC);
    } catch (error) {
      console.log("Error Vote")
    }
  }

  //Change Account
  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);



  return (
    <>
      <Navbar isConnected={isConnected} setIsConnected={setIsConnected} setAccount={setAccount} account={account} />
      <Routes>
        <Route path="/" element={<HomePage isConnected={isConnected} account={account} />} />
        <Route path='/el' element={<CreateElection isConnected={isConnected} electionFormInput={electionFormInput} setelectionFormInput={setelectionFormInput} createElection={createElection} />} />
        <Route path='/elList' element={<ElectionList isConnected={isConnected} getElectionData={getElectionData} electionData={electionData} />} />
        <Route path='/candidate' element={<CreateCandidate isConnected={isConnected} candidateFormInput={candidateFormInput} setcandidateFormInput={setcandidateFormInput} createCandidate={createCandidate} />} />
        <Route path='/candidateList' element={<CandidateList isConnected={isConnected} candidateListFormInput={candidateListFormInput} setcandidateListFormInput={setcandidateListFormInput} candidateData={candidateData} getCandidateData={getCandidateData} />} />
        <Route path='/voter' element={<CreateVoter isConnected={isConnected} createVoter={createVoter} voterFormInput={voterFormInput} setvoterFormInput={setvoterFormInput} />} />
        <Route path='/voterList' element={<VoterList isConnected={isConnected} voterListFormInput={voterListFormInput} setvoterListFormInput={setvoterListFormInput} voterData={voterData} getVoterData={getVoterData} />} />
        <Route path='/vote' element={<Vote isConnected={isConnected} voteCandiate={voteCandiate} voteFormInput={voteFormInput} setvoteFormInput={setvoteFormInput} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
