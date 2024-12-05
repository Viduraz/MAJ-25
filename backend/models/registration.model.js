import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },
    idNumber: { type: Number, default: 0, required: true },
    paymentDate: { type: Date },
    amount: { type: Number },
    receiptImage: { type: String },
    type: { type: String }
}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;