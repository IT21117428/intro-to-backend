import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized request, Token missing!" });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
};
