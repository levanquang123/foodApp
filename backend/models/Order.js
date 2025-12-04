import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
            quantity: Number
        }
    ],
    totalPrice: Number
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
