const ethers = require("ethers");

const deriveEthereumWallet = (seed) => {
  const ethPath = "m/44'/60'/0'/0/0";
  const rootNode = ethers.HDNodeWallet.fromSeed(seed);
  const ethNode = rootNode.derivePath(ethPath);

  console.log("\n--- Ethereum ---");
  console.log("Derivation Path:   ", ethPath);
  console.log("Private Key:       ", ethNode.privateKey);
  console.log("Public Key:        ", ethNode.publicKey);
  console.log("Address:           ", ethNode.address);
};

module.exports = { deriveEthereumWallet };
