import express from "express";
import { loginUser, logoutUser, myProfile, registerUser } from "../controller/user-controller.js";
import { isAuth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/my-profile", isAuth, myProfile);
export default router;
