import express from "express";
import signup from "../controller/signup.js"
import login from "../controller/login.js"
import profile from "../controller/profile.js";
const router = express.Router();
router.get("/", (req, res) => {
    res.send("hi");
})
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", profile)
export default router;