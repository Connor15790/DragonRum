import mongoose, { Mongoose } from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


// Middleware for calculating total price
CartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    next();
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;