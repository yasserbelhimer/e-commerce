const mongoose = require("mongoose");

const role = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Role", role);
