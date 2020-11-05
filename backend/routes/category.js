const router = require("express").Router();
const Category = require("../models/category");

router.route("/all").get((req, res) => {
	Category.find()
		.then((categories) => res.json(categories))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
	Category.findById(req.params.id)
		.then((category) => res.json(category))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
	const category = new Category({
		name: req.body.name,
	});

	category
		.save()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.status(400).json("Error: " + err);
		});
});

router.route("/:id").delete((req, res) => {
	Category.findByIdAndDelete(req.params.id)
		.then(() => res.json("Category deleted."))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	Category.findById(req.params.id)
		.then((category) => {
			category.name = req.body.name;
			category
				.save()
				.then(() => res.json("Category updated!"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
