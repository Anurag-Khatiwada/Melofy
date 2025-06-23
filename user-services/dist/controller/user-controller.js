import { User } from "../model/User.js";
import logger from "../utils/logger.js";
import TryCatch from "../utils/try-catch.js";
import { validateLogin, validateRegistration, } from "../utils/validation.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generate-token.js";
import { RefreshToken } from "../model/RefreshToken.js";
//register user
export const registerUser = TryCatch(async (req, res, next) => {
    logger.info("Register url hit...");
    const { error } = validateRegistration(req.body);
    if (error) {
        logger.warn(`validation error: ${error.details[0].message}`);
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    const { accessToken, refreshToken } = await generateToken(newUser);
    return res.status(200).json({
        success: true,
        message: "User registered Successfully",
        accessToken,
        refreshToken,
    });
});
//login user
export const loginUser = TryCatch(async (req, res) => {
    logger.info("Login Url hit...");
    const { error } = validateLogin(req.body);
    if (error) {
        logger.warn(`Validation error occured: ${error.details[0].message}`);
        return res.status(400).json({
            success: false,
            message: `Validation error occured: ${error.details[0].message}`,
        });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        logger.info("Invalid user");
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    console.log(user);
    //validate password:
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        logger.warn("Invalid credentials");
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }
    const { accessToken, refreshToken } = await generateToken(user);
    return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        accessToken,
        refreshToken,
        user
    });
});
//logout user
export const logoutUser = TryCatch(async (req, res) => {
    logger.info("Logout Url hit...");
    const { refreshToken } = req.body;
    if (!refreshToken) {
        logger.warn("Invalid Refreshtoken");
        return res.status(400).json({
            success: false,
            message: "Invalid RefreshToken"
        });
    }
    ;
    await RefreshToken.deleteOne({ token: refreshToken });
    logger.info("Logged out successfully");
    res.status(200).json({
        succes: true,
        message: "Logged out successfully"
    });
});
//fetch user profile
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.status(200).json({
        succes: true,
        user
    });
});
export const addToPlayList = TryCatch(async (req, res) => {
    logger.info("Add to playlist url hit...");
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
        logger.warn("user not found");
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    if (user?.playlist.includes(req.params.id)) {
        const index = user.playlist.indexOf(req.params.id);
        user.playlist.splice(index, 1);
        await user.save();
        return res.json({
            message: "Removed from playlist"
        });
    }
    user.playlist.push(req.params.id);
    await user.save();
    res.status(200).json({
        success: true,
        message: "Added to playlist"
    });
});
