import express from "express";
import {
    passActivity,
    createActivity,
    getActivities,
    updateActivity,
    deleteActivity,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/pass", passActivity);
router.post("/", createActivity);
router.get("/", getActivities);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;