import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { RefreshToken } from '../model/RefreshToken.js';
export const generateToken = async (user) => {
    const accessToken = jwt.sign({
        user: user._id.toString(),
        name: user.name
    }, process.env.JWT_SECRET, { expiresIn: "60m" });
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt
    });
    return { accessToken, refreshToken };
};
