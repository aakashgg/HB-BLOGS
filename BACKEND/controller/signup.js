import newUser from "../models/User.js"
import bcrypt from "bcrypt";
async function signup(req, res, next) {
    const { name, email, password, gender } = req.body;
    try {
        const existingUser = await newUser.findOne({ email });
        if (existingUser) {
            console.log("User Exists")
            return res.status(202).json({ message: "User Already Exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        const user = new newUser({ name, email, password: hashedPassword, gender });
        await user.save();
        return res.status(201).json({ message: "Sign up Success" })
    } catch (error) {
        console.log("Error signing up");
        return res.status(500).json({ message: "Internal Server error" });
    }

}

export default signup;