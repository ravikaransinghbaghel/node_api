import jwt from "jsonwebtoken";

export const adminAuthanication = (req, res, next) => {
    const token = req.header("Authorization") || req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({ error: "Access Denied! No token provided." });
    }

    try {
        // ✅ Properly extract token
        const bearerToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
        // console.log(verified.admin.username);
        if (verified.admin.username === "admin@123") {
            next();
        }else{
            return res.status(404).json({ error: "your are not admin . only admin can add branch" });
        }

    } catch (error) {
        return res.status(403).json({ error: "Invalid Token" });
    }
};
