const CNYCTee = artifacts.require("./CNYCTee.sol");

module.exports = async function(deployer) {
  deployer.deploy(CNYCTee, "Crypto NYC", "CNYC", "test");
};
