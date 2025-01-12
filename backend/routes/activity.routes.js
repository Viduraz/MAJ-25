import express from "express";
import {
    passActivity,
    createActivity,
    getActivities,
    updateActivity,
    deleteActivity,
    getActivitiesByEmail,
    markActivityAsNotDone // Import the new function
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/pass", passActivity);
router.post("/", createActivity);
router.get("/", getActivities);
router.get("/user/:email", getActivitiesByEmail); // Add the new route
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);
router.post("/markAsNotDone", markActivityAsNotDone); // Ensure this route is defined

export default router;