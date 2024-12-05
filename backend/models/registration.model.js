import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },
    type: { type: String }
}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;