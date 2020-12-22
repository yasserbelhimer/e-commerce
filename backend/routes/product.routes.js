const router = require("express").Router();
const Product = require("../models/product");

router.route("/all").get((req, res) => {
	Product.find().populate('category','name')
		.then((products) => res.json(products))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
	Product.findById(req.params.id)
		.then((product) => res.json(product))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
	const product = new Product({
		category: req.body.category,
		name: req.body.name,
		quantity: req.body.quantity,
		price: req.body.price,
	});

	product
		.save()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.status(400).json("Error: " + err);
		});
});

router.route("/:id").delete((req, res) => {
	Product.findByIdAndDelete(req.params.id)
		.then(() => res.json("Product deleted."))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	Product.findById(req.params.id)
		.then((product) => {
			product.category = req.body.category || product.category;
			product.name = req.body.name || product.name;
			product.quantity = req.body.quantity || product.quantity;
			product.price = req.body.price || product.price;
			product
				.save()
				.then(() => res.json("Product updated!"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
