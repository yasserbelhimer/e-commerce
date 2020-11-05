const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const product = new Schema(
	{
        id_category:{type:Schema.Types.ObjectId,ref: 'Category',required: true },
		name: { type: String, required: true, trim: true },
		quantity: { type: Number, required: true, trim: true },
		price: { type: Number, required: true, trim: true },
	}
);

module.exports = mongoose.model("Product", product);