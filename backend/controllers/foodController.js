import Food from "../models/Food.js";

export const getFoods = async (req, res) => {
    const foods = await Food.find().populate("categoryId");
    res.json(foods);
};

export const createFood = async (req, res) => {
    const food = new Food(req.body);
    await food.save();
    res.json({ message: "Food created", food });
};

export const updateFood = async (req, res) => {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(food);
};

export const deleteFood = async (req, res) => {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted" });
};
