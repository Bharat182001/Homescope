// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers}=require("hardhat");
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await ethers.getSigners()

  // Deploy Real Estate
  const RealEstate = await ethers.getContractFactory('RealEstate')
  const realEstate = await RealEstate.deploy()
  await realEstate.deployed()

  console.log(`Deployed Real Estate Contract at: ${realEstate.address}`)
  console.log(`Minting 9 properties...\n`)

  for (let i = 0; i < 3; i++) {
    const transaction = await realEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`)
    await transaction.wait()
  }

  for (let i = 3; i < 9; i++) {
    const transaction = await realEstate.connect(seller).mint(`https://bafybeifak6uhwnhl3h7hhrcva4aejpblck6kncfuutntfxygbtwsxmr6di.ipfs.nftstorage.link/${i + 1}.json`)
    await transaction.wait()
  }


  // Deploy Escrow
  const Escrow = await ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(
    realEstate.address,
    seller.address,
    inspector.address,
    lender.address
  )
  await escrow.deployed()

  console.log(`Deployed Escrow Contract at: ${escrow.address}`)
  console.log(`Listing 9 properties...\n`)

  for (let i = 0; i < 9; i++) {
    // Approve properties...
    let transaction = await realEstate.connect(seller).approve(escrow.address, i + 1)
    await transaction.wait()
  }

  // Listing properties...
  transaction = await escrow.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(15), tokens(5))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(10), tokens(5))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(4, buyer.address, tokens(103), tokens(50))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(5, buyer.address, tokens(80), tokens(30))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(6, buyer.address, tokens(95), tokens(25))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(7, buyer.address, tokens(250), tokens(80))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(8, buyer.address, tokens(220), tokens(90))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(9, buyer.address, tokens(180), tokens(60))
  await transaction.wait()


  console.log(`Finished.`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Gateway URL : https://nftstorage.link/ipfs/bafybeidyfnm2k2ieghshg6mrmjvd57rgyj56fm5crnmgyljlxw3pdhqcce/
// Image URL : https://bafybeihyspuo47viookt4r4zic4jrasldwilyfob7nsypwwhzr6pdxu3jm.ipfs.nftstorage.link/imageName.jpg