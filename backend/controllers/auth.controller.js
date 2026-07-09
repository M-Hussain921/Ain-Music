import users from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getOtp } from "../utils/generateOtp.js";
import redisClient from "../config/redisClient.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const OTP_EXPIRY_SECONDS = 300;

export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return res.status(400).json({
      message: "Phone Number is required",
    });

  try {
    const otp = getOtp();

    await redisClient.set(`otp:${phoneNumber}`, String(otp), {
      EX: OTP_EXPIRY_SECONDS,
    });

    await client.messages.create({
      body: `Your Ain Music verification code is ${otp}. This code expires in ${OTP_EXPIRY_SECONDS / 60} minutes. Do not share this code with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
