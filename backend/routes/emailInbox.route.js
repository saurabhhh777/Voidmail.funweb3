import express from "express";

const route = express.Router();

import { getAllEmails  } from "../controllers/emailInbox.controller.js";


route.route('/getAllEmails').get(getAllEmails);


export default route;