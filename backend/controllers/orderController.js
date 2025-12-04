import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate("items.foodId");
    res.json(orders);
};

export const createOrder = async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order created", order });
};
