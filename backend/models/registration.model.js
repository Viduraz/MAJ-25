import { activitySchema } from "./activity.model.js";

import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true // Make email unique
    },
    school: { type: String, required: true },
    idNumber: { type: Number, default: 0, required: true },
    paymentDate: { type: Date },
    amount: { type: Number },
    receiptImage: { type: String },
    type: { type: String },
    activities: [{
        id: { type: String},
        name: { type: String },
        default: [],
    }],
}, { timestamps: true });

// Add a compound index for email and type if you want to allow same email for different types
registrationSchema.index({ email: 1, type: 1 }, { unique: true });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;