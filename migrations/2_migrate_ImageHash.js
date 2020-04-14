const ImageHashes = artifacts.require("ImageHashes");

module.exports = function(deployer) {
  deployer.deploy(ImageHashes);
};
