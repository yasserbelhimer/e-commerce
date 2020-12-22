const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const categoryRoute = require("./routes/category.routes");
const productRoute = require("./routes/product.routes");
const adminRoutes = require('./routes/admin.routes')

require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use(express.json());
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/admin", adminRoutes);

const run = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    //   initial();
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
  app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
  });
};

run();