const { Keypair } = require("@solana/web3.js");
const { derivePath } = require("ed25519-hd-key");
const bs58 = require("bs58");

const deriveSolanaWallet = (seed) => {
  const solanaPath = "m/44'/501'/0'/0'";

  // Must ensure seed is a Buffer; derivePath returns an object with `key`
  const { key: derivedSeed } = derivePath(solanaPath, seed);

  // Solana Keypair.fromSeed expects 32 bytes only
  const solanaKeypair = Keypair.fromSeed(derivedSeed);

  const solanaAddress = solanaKeypair.publicKey.toBase58();
  console.log(typeof bs58.encode); // Should log "function"
  const solanaPrivateKey = bs58.encode(solanaKeypair.secretKey); // 64-byte private + public

  console.log("\n--- Solana ---");
  console.log("Derivation Path:     ", solanaPath);
  console.log("Private Key (Base58):", solanaPrivateKey);
  console.log("Public Key/Address:  ", solanaAddress);
};

module.exports = { deriveSolanaWallet };
