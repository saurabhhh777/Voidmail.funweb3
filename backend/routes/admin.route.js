import express from "express";
const route = express.Router();

import {
  createAdminWallet,
  getAllAdminWallets,
  getAdminWalletByAddress,
  updateAdminRole,
  deleteAdminWallet
} from "../controllers/admin.controller.js";
import isAdmin from "../middleware/isAdmin.js";

// Create admin wallet
route.route('/create').post(createAdminWallet);
// Get all admin wallets
route.route('/all').get(isAdmin, getAllAdminWallets);
// Get admin wallet by address
route.route('/:walletAddress').get(isAdmin, getAdminWalletByAddress);
// Update admin role
route.route('/:walletAddress/role').put(isAdmin, updateAdminRole);
// Delete admin wallet
route.route('/:walletAddress').delete(isAdmin, deleteAdminWallet);

export default route;
