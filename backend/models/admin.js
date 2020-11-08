const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admin = new Schema(
	{
        firstName:{ type: String, required: true, trim: true },
        lastName:{ type: String, required: true, trim: true },
		username: { type: String, required: true,unique: true, trim: true },
		email: { type: String, required: true,unique: true, trim: true },
		password:{
            type:String,
            required:true,
        }
	}
);

module.exports = mongoose.model("Admin", admin);