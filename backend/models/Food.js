import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

export default mongoose.model("Food", foodSchema);
