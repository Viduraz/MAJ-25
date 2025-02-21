import Registration from "../models/registration.model.js";

export const createRegistration = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if registration already exists
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({ 
        message: "A registration with this email already exists" 
      });
    }

    // Proceed with creating new registration
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json(newRegistration);
    
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

export const getUserByEmail = async (req, res) => {
    const { email } = req.params; // Get the activity ID from URL params

    try {
        const registration = await Registration.findOne({
            email
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

};

export const getUsersBySchool = async (req, res) => {
    const { email } = req.params;

    try {
        // Find the registration by email to get the school
        const registration = await Registration.findOne({ email });
        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        // Find all registrations with the same school
        const users = await Registration.find({ school: registration.school });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRegistration = async (req, res) => {
    const { id } = req.params;
    const { fullName, gender, phoneNumber, email, school, idNumber, receiptImage, amount, paymentDate, type } = req.body;

    try {
        const updatedRegistration = await Registration.findByIdAndUpdate(
            id,
            { fullName, gender, phoneNumber, email, school, idNumber, receiptImage, amount, paymentDate, type },
            { new: true }
        );
        res.status(200).json(updatedRegistration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRegistration = async (req, res) => {
    const { id } = req.params;

    try {
        await Registration.findByIdAndDelete(id);
        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};