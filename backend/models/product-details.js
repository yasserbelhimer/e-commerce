const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productDetails = new Schema(
	{
        id_product:{type:Schema.Types.ObjectId,ref: 'Product',required: true },
		name: { type: String, required: true, trim: true },
		quantity: { type: String, required: true, trim: true },
	}
);

module.exports = mongoose.model("ProductDetails", productDetails);