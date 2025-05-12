import express from "express";
import signup from "../controller/signup.js";
import login from "../controller/login.js";
import profile from "../controller/profile.js";
import logout from "../controller/logout.js";
import createPost from "../controller/createPost.js";
import getpost from "../controller/getpost.js";
import getMyPosts from "../controller/myposts.js";
import { singleUpload } from "../multer.js";
import auth from "../middleware/auth.js"; // ✅ use correct middleware name
import searchPosts from "../controller/searchPosts.js";
import DeletePost from "../controller/deletePost.js";


const router = express.Router();

router.get("/", (req, res) => {
    res.send("hi");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", auth, profile);
router.post("/logout", logout);

router.get("/getpost/:id", getpost);
router.get("/getpost", getpost);

router.get("/myposts", auth, getMyPosts);
router.get("/search", searchPosts);
// DELETE route in Express.js
router.delete('/delete/:id', auth, DeletePost);
router.post("/post", auth, singleUpload, createPost);

export default router;
