const bip39 = require("bip39");
const { deriveEthereumWallet } = require("../Wallets/Ethereum.js");
const { deriveBitcoinWallet } = require("../Wallets/Bitcoin.js");
const { deriveSolanaWallet } = require("../Wallets/Solana.js");

async function main() {
  const mnemonic = bip39.generateMnemonic();
  console.log("=========================");
  console.log("✅ Generated 12-Word Mnemonic Phrase:");
  console.log(mnemonic);
  console.log("=====================");

  const seed = await bip39.mnemonicToSeed(mnemonic);
  console.log("=============================");
  console.log("✅ Derived Seed (512-bit):");
  console.log(seed.toString("hex"));
  console.log("============================");

  deriveEthereumWallet(seed);
  deriveBitcoinWallet(seed);
  deriveSolanaWallet(seed);

  console.log(
    "\n========================================================================"
  );
  console.log("✅ Wallet generation complete.");
}
main().catch((error) => {
  console.error("Error generating mnemonic:", error);
});
