import jwt from "jsonwebtoken";

export const isAuthanication = (req, res, next) => {
    const token = req.header("Authorization") || req.cookies.userToken;

    if (!token) {
        return res.status(401).json({ error: "Access Denied! No token provided." });
    }

    try {
        // ✅ Properly extract token
        const bearerToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid Token" });
    }
};
