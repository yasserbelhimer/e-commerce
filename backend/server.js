const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const adminRoute = require("./routes/admin");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use("/admin", adminRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

const run = async () => {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});
	app.listen(port, () => {
		console.log(`Server is running http://localhost:${port}`);
	});
};

run();
