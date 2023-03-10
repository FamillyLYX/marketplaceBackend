const mongoose = require("mongoose");
const express = require("express");
const { Item } = require("./models/item");
const dotenv = require("dotenv");
const { itemsRoute } = require("./routes/items");
dotenv.config();
let DB_URL = process.env.MONGODB_URL;

const app = express();
const PORT = process.env.PORT ?? 8080;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverApi: ServerApiVersion.v1,
  })
  .then(() => console.log("success"))
  .catch((err) => console.log(err));

// const test = async () => {
//   const item = await Item.create({
//     nftId: 1,
//     contractAddress: "",
//     originalMinter: "",
//     size: "",
//     drop: "",
//   });
//   const items = await Item.find();
//   console.log(items);
// };
// test();
app.use("/items", itemsRoute);
app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
