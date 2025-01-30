<<<<<<< HEAD
import { activitySchema } from "./activity.model.js";

=======
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
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
<<<<<<< HEAD
    type: { type: String },
    activities: [{
        id: { type: String},
        name: { type: String },
        default: [],

    }],
=======
    type: { type: String }
>>>>>>> ca897cea8e8ce0edd0761379ecfad1f5c221189c
}, { timestamps: true });

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;