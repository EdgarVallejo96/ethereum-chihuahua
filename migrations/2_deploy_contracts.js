var Control = artifacts.require("./Control.sol"); // Expose the contract to interact with it

module.exports = function(deployer) {
  deployer.deploy(Control);
};
