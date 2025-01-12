
import Registration from "../models/registration.model.js";
import Activity from '../models/activity.model.js';

export const passActivity = async (req, res, next) => {
    try {
        const { email, activityName, activityId } = req.body;
        const registration = await Registration.findOne({
            email
        });

        console.log(registration)

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }
        const activityExists = registration.activities.some(
            (existingActivity) => existingActivity.id === activityId
        );
        if (!activityExists) {
            registration.activities.push({ id: activityId, name: activityName });
        }

        await registration.save()
        res.status(200).json(registration);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new activity
export const createActivity = async (req, res) => {
    try {
        const { id, name } = req.body;

        // Check if the activity with the same id already exists
        const existingActivity = await Activity.findOne({ id });
        if (existingActivity) {
            return res.status(400).json({ message: "Activity with this ID already exists" });
        }

        // Create a new activity
        const activity = new Activity({ id, name });
        await activity.save();

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all activities
export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find(); // Fetch all activities
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an activity
export const updateActivity = async (req, res) => {
    try {
        const { id } = req.params; // Get the activity ID from URL params
        const { name } = req.body; // Get the new name from the request body

        // Find the activity by id and update it
        const updatedActivity = await Activity.findOneAndUpdate(
            { id },
            { name },
            { new: true } // Return the updated activity
        );

        if (!updatedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params; // Get the activity ID from URL params

        // Find the activity by id and delete it
        const deletedActivity = await Activity.findOneAndDelete({ id });

        if (!deletedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};