import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    availableQty: {
        type: Number,
        require: true
    }
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;