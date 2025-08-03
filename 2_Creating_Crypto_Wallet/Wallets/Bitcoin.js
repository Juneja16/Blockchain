const { BIP32Factory } = require("bip32");
const bitcoin = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory(ecc);

const deriveBitcoinWallet = (seed) => {
  // Placeholder for Bitcoin wallet derivation logic
  console.log("Bitcoin wallet derivation logic goes here.");

  // Way to create a Bitcoin wallet from a seed
  // Using BIP32 and bitcoinjs-lib
  // BIP44 path for Bitcoin: m/44'/0'/0'/0/0
  // This path is for the first account, first change, first address
  // The path can be adjusted for different accounts or addresses
  // Example: m/44'/0'/0'/0/1 for the second address
  // Note: The path is derived from BIP44 standard for Bitcoin
  // BIP32Factory is used to create a BIP32 node from the seed
  const btcPath = "m/44'/0'/0'/0/0";

  // Create the Master Private Key from the seed
  //i.e the root node of the BIP32 Hierarchial Deterministic wallet
  const rootNode = bip32.fromSeed(seed);

  // Derive the Bitcoin node using the BIP44 path
  // The derived node contains the private key and public key
  const btcNode = rootNode.derivePath(btcPath);

  // The public key can be used to generate the Bitcoin address
  // publicKey = uint8[12,123,1,21,123,1,4,23,211,6,8,9] == hexdecimal
  // uint8 array to normal array of bytes(0-255)  --> Array.from(btcNode.publicKey)
  // then convert each byte to a minimum 2 digit hexadecimal string

  const publicKey = Array.from(btcNode.publicKey)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // The address is generated using the public key and the P2PKH payment method
  // P2PKH is the standard payment method for Bitcoin addresses
  // The address is a Base58Check encoded string

  const btcAddress = bitcoin.payments.p2pkh({
    pubkey: Buffer.from(btcNode.publicKey),
  }).address;

  // The private key is in WIF (Wallet Import Format) for easy import into wallets
  // The WIF format is a Base58Check encoded string that includes the version byte and checksum

  console.log("\n--- Bitcoin ---");
  console.log("Derivation Path:   ", btcPath);
  console.log("Private Key (WIF): ", btcNode.toWIF());
  console.log("Public Key:        ", publicKey);
  console.log("Address:           ", btcAddress);
};

module.exports = { deriveBitcoinWallet };
