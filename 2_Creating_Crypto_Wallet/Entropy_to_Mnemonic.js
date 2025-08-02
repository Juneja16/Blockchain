// Destructuring the required modules
// This code generates 16 bytes of entropy and logs it in hexadecimal format.
const crypto = require("crypto");
const bip39 = require("bip39");

// Convert the entropy to a mnemonic phrase

function generateEntropy() {
  const entropy = crypto.randomBytes(16);
  console.log("==============================");
  console.log("✅ Generated 16-Byte Entropy:");
  console.log("Entropy (Buffer Object):", entropy);
  console.log("Type of entropy:", typeof entropy);
  const entropyHex = entropy.toString("hex");
  console.log("Entropy (hex):", entropyHex);
  console.log("===========================");
  console.log("===========================");
  return entropyHex;
}

function generateMnemonic(entropyHex) {
  try {
    const mnemonic = bip39.entropyToMnemonic(entropyHex);
    console.log("✅ Generated Mnemonic Phrase:");
    console.log(mnemonic);
    return mnemonic;
  } catch (error) {
    console.error("Error generating mnemonic:", error);
  }
}

function directMnemonicGeneration() {
  console.log("===========================");
  console.log("===========================");
  const mnemonicdirect = bip39.generateMnemonic();
  console.log("✅ Generated Mnemonic Phrase (Direct):");
  console.log(mnemonicdirect);
}

 async function main() {
  console.log("Starting entropy and mnemonic generation...");
  const entropyHex = generateEntropy();

  console.log("Converting entropy to mnemonic...");
  const mnemonic = generateMnemonic(entropyHex);

  const seed = await bip39.mnemonicToSeed(mnemonic);
  return seed;
  //   console.log("Generating mnemonic phrase directly...");
  //   directMnemonicGeneration();
}

main().then((seed) => {
  console.log("==============================");
  console.log("✅ Derived Seed (512-bit):");
  console.log(seed.toString("hex"));
  console.log("==============================");
});

module.exports = { main };
