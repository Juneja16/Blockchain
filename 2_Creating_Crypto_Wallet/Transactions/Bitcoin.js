import * as bitcoin from "bitcoinjs-lib";
import fetch from "node-fetch";

// Replace with your GetBlock BTC Testnet JSON-RPC URL
const RPC_URL = "https://btc.getblock.io/testnet/?api_key=YOUR_API_KEY";

// RPC helper
async function rpcCall(method, params = []) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method,
    params,
  };

  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

async function sendBTCWithGetBlock(wif, toAddress, amountBTC) {
  const network = bitcoin.networks.testnet;

  const keyPair = bitcoin.ECPair.fromWIF(wif, network);
  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network,
  });

  console.log("Sender Address:", address);

  // Step 1: Get unspent UTXOs
  const unspent = await rpcCall("listunspent", [1, 9999999, [address]]);

  if (unspent.length === 0) throw new Error("No UTXOs found");

  const psbt = new bitcoin.Psbt({ network });

  let inputSum = 0;
  const satoshisToSend = Math.floor(Number(amountBTC) * 1e8);
  const fee = 200; // Fixed fee

  for (const utxo of unspent) {
    const txRawHex = await rpcCall("getrawtransaction", [utxo.txid, false]);

    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      nonWitnessUtxo: Buffer.from(txRawHex, "hex"),
    });

    inputSum += Math.floor(utxo.amount * 1e8);
    if (inputSum >= satoshisToSend + fee) break;
  }

  if (inputSum < satoshisToSend + fee) {
    throw new Error("Insufficient funds.");
  }

  // Step 2: Add outputs
  psbt.addOutput({
    address: toAddress,
    value: satoshisToSend,
  });

  const change = inputSum - satoshisToSend - fee;
  if (change > 0) {
    psbt.addOutput({
      address,
      value: change,
    });
  }

  // Step 3: Sign and finalize
  psbt.signAllInputs(keyPair);
  psbt.finalizeAllInputs();

  const rawTxHex = psbt.extractTransaction().toHex();

  // Step 4: Broadcast
  const txid = await rpcCall("sendrawtransaction", [rawTxHex]);

  console.log("Transaction Broadcasted! TXID:", txid);
  return txid;
}

// 🧪 Testnet Example
sendBTCWithGetBlock(
  "cT5EKBi33cvHgYMxNR8Np9t3SwW5j8fTZ67ZqKqztCzLaKzLKHZ9", // WIF private key
  "tb1qq0tsn27wupwv7fqj5r54ge9n2pgfuc4x9ed4d7",            // Recipient testnet address
  "0.00005"                                                // Amount BTC
);
