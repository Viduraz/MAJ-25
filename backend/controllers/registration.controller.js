import Registration from "../models/registration.model.js";

export const createRegistration = async (req, res) => {
    const { fullName, gender, phoneNumber, email, school, idNumber, receiptImage, amount, paymentDate, type } = req.body;

    const newScout = new Registration({ fullName, gender, phoneNumber, email, school, idNumber, receiptImage, amount, paymentDate, type });
    try {
        await newScout.save();
        res.status(200).json(newScout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRegistration = async (req, res) => {
    const { email, password } = req.body;

    try {
        const registration = await Registration.findOne({
            email,
            phoneNumber: password,
        });
        res.status(200).json(registration);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllRegistration = async (req, res) => {
    try {
        const registration = await Registration.find();
        res.status(200).json(registration);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}