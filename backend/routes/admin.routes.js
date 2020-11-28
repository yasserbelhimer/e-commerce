const controller = require("../controllers/admin.controller");
const withAuth = require("../middlewares/authJwt");
const verifySignUp = require("../middlewares/verifySignUp");
const router = require("express").Router();
router.post("/register", verifySignUp, controller.signup);
router.post("/login", controller.login);

router.get("/",withAuth,controller.getAdmins)
module.exports = router;
