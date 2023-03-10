const { request, response } = require("express");
const express = require("express");
const { Item } = require("../models/item");
const itemsRoute = express.Router();

itemsRoute.get("/", async (request, response) => {
  try {
    const { user, id } = request.query;
    if (id) {
      Item.findById(id, (err, data) => {
        if (err) {
          response.errored(err);
        } else {
          response.json(data);
        }
      });
    } else if (user) {
      const items = Item.find({ seller: user });
      response.json(items);
    } else {
      let data = await Item.find();
      response.json(data);
    }
  } catch (err) {
    response.status(500).send(err);
  }
});

// itemsRoute.get("/", (request, response) => {
//   try {
//     const { user, id } = request.query;
//     const items = Item.find({ seller: user });
//     response.json(items);
//   } catch (err) {
//     response.status(500).send(err);
//   }
// });
// itemsRoute.get("/:id", (request, response) => {
//   const { id } = request.params;
//   try {
//     const items = Item.findById(id);
//     response.json(items);
//   } catch (err) {
//     response.status(500).send(err);
//   }
// });

itemsRoute.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    // let item = await Item.findById(id);
    let deletedItem = await Item.findByIdAndDelete(id);
    response.status(200).send(`item deleted ${deletedItem.id} successfully`);
  } catch (error) {
    response.send(error);
  }
});

itemsRoute.post("/", async (request, response) => {
  try {
    let {
      id,
      contractAddress,
      originalMinter,
      size,
      drop,
      seller,
      price,
      imgUrl,
    } = request.body;
    let newItem = await Item.create({
      nftId: id,
      contractAddress: contractAddress,
      originalMinter: originalMinter,
      price: price,
      size: size,
      drop: drop,
      imgUrl: imgUrl,
      seller: seller,
    });
  } catch (error) {
    response.status(300).send("error occurred check the body of the request");
  }
});

module.exports = { itemsRoute };
