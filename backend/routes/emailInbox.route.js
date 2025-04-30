import express from "express";

const route = express.Router();

import { getAllEmails  } from "../controllers/emailInbox.controller.js";


route.route('/getAllEmails').post(getAllEmails);

export default route;