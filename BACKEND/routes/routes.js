import express from "express";
import signup from "../controller/signup.js"
import login from "../controller/login.js"
import profile from "../controller/profile.js";
import logout from "../controller/logout.js";
import createPost from "../controller/createPost.js";
import getpost from "../controller/getpost.js";
import { singleUpload } from "../multer.js"

const router = express.Router();
router.get("/", (req, res) => {
    res.send("hi");
})
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.get("/getpost/:id", getpost);

router.get("/getpost", getpost);
router.post("/post", singleUpload, createPost);
export default router;