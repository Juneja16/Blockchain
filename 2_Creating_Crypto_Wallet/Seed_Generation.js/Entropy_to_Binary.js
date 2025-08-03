const crypto = require("crypto");
// Calculating Entropy(16bytes) through crypto.randomBytes
const Entropy = () => {
  const entropyNo = crypto.randomBytes(16);
  console.log("✅Entropy no generated:", entropyNo.toString("hex"));
  return entropyNo.toString("hex");
};

// There represents 32 hexadecimal characters, which is equivalent to 128 bits of entropy
const hex = Entropy();

// Converting hexadecimal to Decimal(BigInt to store big integers)
const bigNum = BigInt("0x" + hex);

// Converting Decimal to Binary
// and it may not be 128 bits long as it omits the leading zeros
const binary = bigNum.toString(2);
console.log("✅Binary representation of entropy:", binary);

// Making sure the binary representation is 128 bits long
// If the binary representation is less than 128 bits, pad it with leading zeros
const binary128 = binary.padStart(128, "0");
console.log("✅Binary representation (128 bits):", binary128);
