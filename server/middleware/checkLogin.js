import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]; 
        try {
            const decoded = jwt.verify(token, process.env.jwtSecret);
            req.user = decoded;
            next(); 
        } catch (error) {
    
            return res.status(403).json({ message: "Invalid or expired token." });
        }
    } else {
    
        return res.status(401).json({ message: "Authorization token required." });
    }
};

export default verifyToken;
