const { signTx } = require("deso-protocol");
const { decryptSeedHex } = require("./decryptSeedHex");

exports.signHex = async (req, res) => {
  //Assign names to request body variables
  let transactionHex = req.body.transactionHex;
  let encryptedSeedHex = req.body.encryptedSeedHex;
  let hostEncryptionKey = req.body.hostEncryptionKey;
  let isDerivedKey = req.body.isDerivedKey?.toLowerCase() === "true";

  //Decrypt seed hex and use decrypted seed hex to sign transaction
  const seedHex = decryptSeedHex(encryptedSeedHex, hostEncryptionKey);
  // Note: if you need to sign a transaction with a derived key,
  const signedHex = await signTx(transactionHex, seedHex, { isDerivedKey });
  //Return JSON object with signedHex
  return res.status(200).json({
    signedHex,
  });
};
