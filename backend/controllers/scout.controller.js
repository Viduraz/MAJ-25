import Scout from "../models/scout.model.js";

export const createScout = async (req, res, next) => {
    const { fullName, gender, phoneNumber, email, type } = req.body;

    const newScout = new Scout({ fullName, gender, phoneNumber, email, type });
    try {
        await newScout.save();
        res.status(201).json(newScout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};