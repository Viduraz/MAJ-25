import mongoose from "mongoose";

export const activitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;