const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import {
  EMAIL_VERIFY_TEMPLATE,
  SIGNIN_OTP_TEMPLATE,
} from "../config/emailTemplete";
import { User } from "../models/user";

export const signup = async (req: any, res: any) => {
  const { email, dob, fullName, otp } = req.body;

  try {
    if (!email?.trim() || !dob?.trim() || !fullName?.trim() || !otp?.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ verifyOtp: otp });
    if (!user) {
      return res.status(401).json({ message: "Invalid OTP." });
    }

    if (
      user.email !== email ||
      user.dob !== dob ||
      user.fullName !== fullName
    ) {
      return res.status(401).json({ message: "User details do not match." });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(401).json({ message: "OTP Expired." });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({
      success: true,
      message: `${user.fullName} is successfully registered.`,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const googleSignin = async (req: any, res: any) => {
  const { email, fullName, dob } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });
    let message = "";

    if (!user) {
      user = new User({
        fullName,
        email,
        dob,
        isAccountVerified: true,
      });
      await user.save();
      message = `${user.fullName} is successfully registered.`;
    } else {
      message = "Signin successful.";
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      user,
      message,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getOtp = async (req: any, res: any) => {
  const { email, dob, fullName } = req.body;

  try {
    if (!email?.trim() || !dob?.trim() || !fullName?.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email });

    if (user?.isAccountVerified) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (user) {
      user.fullName = fullName;
      user.dob = dob;
      user.verifyOtp = newOtp;
      user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
      await user.save();
    } else {
      user = await User.create({
        email,
        dob,
        fullName,
        verifyOtp: newOtp,
        verifyOtpExpireAt: Date.now() + 10 * 60 * 1000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Email Verification OTP",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", newOtp)
        .replace("{{name}}", user.fullName)
        .replace("{{email}}", email),
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "OTP sent to your email.!",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const sendOtp = async (req: any, res: any) => {
  const { email } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser || !existingUser.isAccountVerified) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    existingUser.verifyOtp = newOtp;
    existingUser.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await existingUser.save();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Signin OTP",
      html: SIGNIN_OTP_TEMPLATE.replace("{{otp}}", newOtp)
        .replace("{{name}}", existingUser.fullName)
        .replace("{{email}}", email),
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const signin = async (req: any, res: any) => {
  const { email, otp, keepMeLoggedIn } = req.body;

  try {
    if (!email?.trim() || !otp?.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const user = await User.findOne({ email });

    if (!user?.isAccountVerified) {
      return res.status(400).json({ message: "User does not exist." });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: "User details do not match." });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP Expired." });
    }

    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: keepMeLoggedIn ? "30d" : "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: keepMeLoggedIn ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Signin Successful.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const signout = async (req: any, res: any) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Signout Successful." });
};
