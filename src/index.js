const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
require("./db/mongodb");

//route handlers
const itemsRouter = require("./routes/items");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/items", itemsRouter);

app.listen(port, () => {
  console.log("listening on port " + port);
});
