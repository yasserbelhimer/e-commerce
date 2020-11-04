const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

const run = async () => {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
	});
	app.listen(port, () => {
        console.log(`Server is running http://localhost:${port}`);
    });
};

run();
