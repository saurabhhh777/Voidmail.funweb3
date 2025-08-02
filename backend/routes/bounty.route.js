import express from "express";
const route = express.Router();

import {
  createBounty,
  getAllBounties,
  getBountyById,
  updateBounty,
  deleteBounty,
  submitSolution,
  reviewSubmission,
  getUserBounties
} from "../controllers/bounty.controller.js";

import authenticateSession from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

// Public routes (no auth required)
route.route('/').get(getAllBounties);
route.route('/:id').get(getBountyById);

// Protected routes (require authentication)
route.route('/').post(authenticateSession, createBounty);
route.route('/user').get(authenticateSession, getUserBounties);
route.route('/:id').put(authenticateSession, updateBounty);
route.route('/:id').delete(authenticateSession, deleteBounty);
route.route('/:id/submit').post(authenticateSession, submitSolution);

// Admin routes (require admin authentication)
route.route('/:id/submissions/:submissionId/review').put(isAdmin, reviewSubmission);

export default route; 