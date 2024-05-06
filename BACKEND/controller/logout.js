const logout = (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    return res.status(200).json({ message: "Logged Out Success" });
}

export default logout;


