//var Election = artifacts.require("./Election.sol");
var Reports = artifacts.require("./Reports.sol");


module.exports = function(deployer) {
  //deployer.deploy(Election);
  deployer.deploy(Reports);
};
