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

import { auth } from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

// Public routes (no auth required)
route.route('/').get(getAllBounties);
route.route('/:id').get(getBountyById);

// Protected routes (require authentication)
route.route('/').post(auth, createBounty);
route.route('/user').get(auth, getUserBounties);
route.route('/:id').put(auth, updateBounty);
route.route('/:id').delete(auth, deleteBounty);
route.route('/:id/submit').post(auth, submitSolution);

// Admin routes (require admin authentication)
route.route('/:id/submissions/:submissionId/review').put(isAdmin, reviewSubmission);

export default route; 