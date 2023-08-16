const hre = require("hardhat");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy();

  await votingSystem.deployed();

  console.log("Lock with 1 ETH deployed to:", votingSystem.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});