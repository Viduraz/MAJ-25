import mongoose from "mongoose";

const scoutSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    type: { type: String }
}, { timestamps: true });

const Scout = mongoose.model("Scout", scoutSchema);

export default Scout;