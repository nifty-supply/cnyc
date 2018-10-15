const IPFS = require("ipfs-api");
const fs = require("fs");

const CNYCTee = artifacts.require("./CNYCTee.sol");

module.exports = async function(deployer) {
  const metadata = {
    name: "CryptoNYC OG",
    description:
      "CryptoNYC OG Token, bestowed to early supporters of the CryptoNYC organization and unlocking unique membership privileges."
  };

  const ipfs = IPFS("ipfs.infura.io", 5001, {
    protocol: "https"
  });

  const tokenImage = fs.readFileSync("./migrations/assets/OG_token.png");
  const imageCID = await ipfs.files.add(tokenImage);

  metadata.image = "https://ipfs.io/ipfs/" + imageCID[0].hash;

  const metadataCID = await ipfs.files.add(
    new Buffer(JSON.stringify(metadata))
  );

  await deployer.deploy(CNYCTee, "Crypto NYC", "CNYC", metadataCID[0].hash);
};
