import Registration from "../models/registration.model.js";
import Activity from '../models/activity.model.js';

export const passActivity = async (req, res, next) => {
    try {
        const { email, activityName, activityId } = req.body;
        const registration = await Registration.findOne({ email });

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        const activityExists = registration.activities.some(
            (existingActivity) => existingActivity.id === activityId
        );

        if (!activityExists) {
            registration.activities.push({ id: activityId, name: activityName });
        }

        await registration.save();
        res.status(200).json(registration);
    } catch (error) {
        // Mark the activity as done if an error occurs
        const registration = await Registration.findOne({ email: req.body.email });
        if (registration) {
            registration.activities.push({ id: req.body.activityId, name: req.body.activityName });
            await registration.save();
        }
        res.status(500).json({ message: error.message });
    }
};

// Fetch all activities done by a user based on their email
export const getActivitiesByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const registration = await Registration.findOne({ email });

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json(registration.activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new activity
export const createActivity = async (req, res) => {
    try {
        const { id, name, category } = req.body; // Include category

        // Check if the activity with the same id already exists
        const existingActivity = await Activity.findOne({ id });
        if (existingActivity) {
            return res.status(400).json({ message: "Activity with this ID already exists" });
        }

        // Create a new activity
        const activity = new Activity({ id, name, category });
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
    const { id } = req.params;
    const { name, category } = req.body;

    const updatedActivity = await Activity.findOneAndUpdate(
      { id },
      { name, category },
      { new: true }
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

// Mark an activity as not done
export const markActivityAsNotDone = async (req, res) => {
    try {
        const { email, activityId } = req.body;
        const registration = await Registration.findOne({ email });

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        registration.activities = registration.activities.filter(
            (activity) => activity.id !== activityId
        );

        await registration.save();
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};