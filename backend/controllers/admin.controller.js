const Admin = require("../models/admin.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signup = (req, res) => {
	const admin = new Admin({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	admin
		.save()
		.then((admin) => {
			res.json({ message: "Admin was registered successfully!" });
		})
		.catch((err) => {
			res.status(400).json("Error: " + err);
		});
};

exports.login = (req, res) => {
	const { email, password } = req.body;
	Admin.findOne({ email })
		.then((admin) => {
			if (admin) {
				const passwordIsValid = bcrypt.compareSync(
					password,
					admin.password
				);
				if (!passwordIsValid) {
					return res.status(200).json({
						success: false,
						error: "Invalid Password!",
					});
				}

				const token = jwt.sign({ id: admin.id }, process.env.secret, {
					expiresIn: 86400, // 24 hours
				});
				res.status(200).json({
					success: true,
					message: {
						id: admin._id,
						username: admin.username,
						email: admin.email,
						accessToken: token,
					},
				});
			} else {
				res.status(200).json({
					success: false,
					error: "This Admin does not exist!",
				});
			}
		})
		.catch((err) => res.status(400).json("Error: " + err));
};
exports.getAdmins = (req, res) => {
	Admin.find()
		.then((result) => res.json(result))
		.catch((err) => res.status(404).json({ error: err }));
};
