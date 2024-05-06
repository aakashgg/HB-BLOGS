import jwt from "jsonwebtoken"
const secret = 'hjvbshdvshuvdyus';
const profile = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });

}

export default profile;