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

import { auth } from "../middleware/auth.js";

// Authentication routes
route.route('/session').post(createUserSession);
route.route('/createUserSession').post(createUserSession); // Alternative endpoint name
route.route('/logout').post(logoutUser);

// Protected routes
route.route('/profile').get(auth, getUserProfile);
route.route('/createEmail').post(auth, createEmail);

// Custom email routes
route.route('/createCustomEmail').post(auth, createCustomEmail);
route.route('/customEmails').get(auth, getCustomEmails);

// Email availability checking (public endpoint for better UX)
route.route('/checkEmailAvailability').post(checkEmailAvailability);

export default route;