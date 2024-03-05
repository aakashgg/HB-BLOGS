import newUser from "../models/User.js";
import bcrypt from "bcrypt";
async function login(req, res, next) {
    const { email, password } = req.body;
    try {
        const existingUser = await newUser.findOne({ email });
        if (!existingUser) return res.status(401).json({ message: "User Doesn't Exist" });
        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if (!comparePassword) {
            return res.status(401).json({ message: "Invalid Credentialas" });
        }
        return res.status(200).json({ message: "Logged In Success" });
    } catch (error) {
        console.log("Internal Server Error");
        res.status(500).json({ message: "Server Error" });
    }
}
export default login;