const { request, response } = require("express");
const express = require("express");
const { Item } = require("../models/Item");

const Router = express.Router();

Router.get("/", async (request, response) => {
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

Router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    // let item = await Item.findById(id);
    let deletedItem = await Item.findByIdAndDelete(id);
    response.status(200).send(`item deleted ${deletedItem.id} successfully`);
  } catch (error) {
    response.send(error);
  }
});

Router.delete("/:contract/:id", async (request, response) => {
  try {
    const { id, contract } = request.params;
    console.log(request.params);
    // let item = await Item.findById(id);
    let deletedItem = await Item.deleteOne({
      nftId: id,
      contractAddress: contract,
    });
    response.status(200).send(`item deleted ${deletedItem.id} successfully`);
  } catch (error) {
    console.log(error);
    response.send(error);
  }
});

Router.post("/", async (request, response) => {
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
      images,
      description,
      condition,
      location,
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
      imageLinks: images,
      description: description,
      condition: condition,
      location: location,
    });
  } catch (error) {
    response.status(300).send(error);
  }
});

module.exports = Router;
