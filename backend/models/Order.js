import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
            quantity: Number
        }
    ],
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
