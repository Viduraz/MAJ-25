import express from "express";
import {
  passActivity,
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
  getActivitiesByEmail,
  markActivityAsNotDone
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/pass", passActivity);
router.post("/", createActivity);
router.get("/", getActivities);
router.get("/user/:email", getActivitiesByEmail);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);
router.post("/markAsNotDone", markActivityAsNotDone);

export default router;