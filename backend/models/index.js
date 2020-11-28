const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.admin = require("./admin");
db.role = require("./role");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;