import mongoose from "mongoose";

// Database Object structure
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    procent: {
        type: Number,
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
    },

});

export default mongoose.model('dispatcher', UserSchema);
