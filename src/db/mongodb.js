const mongoose = require("mongoose");

let DB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/marketplacebackend";

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverApi: ServerApiVersion.v1,
  })
  .then(() => console.log("Database Connection Established"))
  .catch((err) => console.log(err));
