import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        jwt.verify(token, "123456", async (error, decoded) => {
            if (error) {
                console.log(error.name);
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Hết hạn token" });
                } else if (error.name === "JsonWebTokenError") {
                    return res.status(401).json({ error: "Token không hợp lệ" });
                }
            } else {
                const user = await User.findOne({ _id: decoded.userId });
                if (!user || user.role !== "admin") {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Đã xảy ra lỗi" });
    }

};