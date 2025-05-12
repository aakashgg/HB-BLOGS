import newUser from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = 'hjvbshdvshuvdyus';

async function login(req, res, next) {
    const { email, password } = req.body;
    try {
        const existingUser = await newUser.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "User Doesn't Exist" });
        }
        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if (!comparePassword) {

            return res.status(402).json({ message: "Invalid Credentials" });
        }
        jwt.sign({ name: existingUser.name, id: existingUser.id }, secret, {}, (err, tokenVal) => {
            if (err) throw err;

            res.cookie('token', tokenVal, {
                httpOnly: true,
                secure: true,                 // Required on HTTPS (Render uses HTTPS)
                sameSite: 'None',             // Required to allow cross-origin requests with credentials
            });


            return res.status(200).json({ message: "Logged In Success" });
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export default login;
