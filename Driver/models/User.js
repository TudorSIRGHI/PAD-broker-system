import mongoose from "mongoose";

// Database Object structure
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    carNumber: {
        type: String,
    },

});

export default mongoose.model('driver', UserSchema);
