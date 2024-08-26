import JWT from 'jsonwebtoken';

const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx";
export const requireSignIn = (req, res, next) => {
    try {
        const token = req.headers.authorizaion;
        if (!token) {
            return res.status(404).json({ message: "authorizaion token is required" })
        }
        const decoded = JWT.verify(token, JWT_SECRET);
        req.user = decoded;//Attach decoded user info to the req obj
        next();
    } catch (error) {
        console.error(error)
        return res.status(404).json({ message: "Invalid or expired" })
    }
}











