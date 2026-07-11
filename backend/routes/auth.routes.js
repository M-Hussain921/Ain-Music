import express from "express";
import { sendOTP,otpVerify } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/send-otp", sendOTP);
router.post("/verify-otp",otpVerify)

export default router;