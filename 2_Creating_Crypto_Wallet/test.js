const bs58 = require("bs58");

console.log("bs58 type:", typeof bs58);
console.log("encode type:", typeof bs58.encode);

const encoded = bs58.encode(Buffer.from("test"));
console.log("Encoded:", encoded);
