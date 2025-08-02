import express from "express";
const route = express.Router();

import { 
  createUserSession, 
  createEmail, 
  getUserProfile, 
  logoutUser,
  createCustomEmail,
  getCustomEmails,
  checkEmailAvailability
} from "../controllers/user.controller.js";

import authenticateSession from "../middleware/auth.js";

// Authentication routes
route.route('/session').post(createUserSession);
route.route('/logout').post(logoutUser);

// Protected routes
route.route('/profile').get(authenticateSession, getUserProfile);
route.route('/email').post(authenticateSession, createEmail);

// Custom email routes
route.route('/createCustomEmail').post(authenticateSession, createCustomEmail);
route.route('/customEmails').get(authenticateSession, getCustomEmails);
route.route('/checkEmailAvailability').post(authenticateSession, checkEmailAvailability);

export default route;