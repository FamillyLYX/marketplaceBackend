const { model, Schema } = require("mongoose");

const itemSchema = new Schema({
  nftId: { type: String, required: true },
  imgUrl: { type: String, required: true },
  contractAddress: { type: String, required: true },
  originalMinter: { type: String, required: true },
  size: { type: String, required: true },
  drop: { type: String, required: true },
  seller: { type: String, required: true },
  price: { type: Number, required: true },
  condition: { type: String, required: false },
  description: { type: String, required: false },
});

const Item = model("Item", itemSchema);
module.exports = { Item };
