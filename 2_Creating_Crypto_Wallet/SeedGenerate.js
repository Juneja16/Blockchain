const bip39 = require("bip39");
async function main() {
  const mnemonic = bip39.generateMnemonic();
  console.log(
    "========================================================================"
  );
  console.log("✅ Generated 12-Word Mnemonic Phrase:");
  console.log(mnemonic);
  console.log(
    "========================================================================"
  );
}
main().catch((error) => {
  console.error("Error generating mnemonic:", error);
});
