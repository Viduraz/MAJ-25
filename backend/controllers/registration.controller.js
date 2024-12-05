import Registration from "../models/registration.model.js";

export const createRegistration = async (req, res, next) => {
    const { fullName, gender, phoneNumber, email, school, idNumber, receiptImage, amount, paymentDate, type } = req.body;

    const newScout = new Registration({ fullName, gender, phoneNumber, email, school, idNumber, receiptImage, amount, paymentDate, type });
    try {
        await newScout.save();
        res.status(200).json(newScout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};