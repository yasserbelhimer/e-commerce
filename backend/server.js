const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const db = require("./models");
const Role = db.role;

require("dotenv").config();
var corsOptions = {
  origin: "http://localhost:5000",
};
const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors(corsOptions));
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
app.use("/product", productRoute);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const run = async () => {
  await db.mongoose
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

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
