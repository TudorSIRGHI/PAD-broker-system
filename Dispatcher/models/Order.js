import mongoose from "mongoose";

// Database Object structure
const OrderSchema = new mongoose.Schema({
    pointA: {
        type: String,
    },
    pointB: {
        type: String,
    },
    price: {
        type: Number,
    },
    products: {
        type: String,
    },
});

export default mongoose.model('order', OrderSchema);
