const { main } = require("./Entropy_to_Mnemonic.js");

main().then((seed) => {
  console.log(seed.toString("hex"));
});
