const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/api/v1/auth", async (req, res) => {
    try {
        const { name, email, picture } = req.body;
        let user = await User.findOne({
            email: email
        });
        if (!user) {
            user = new User({
                name,
                email,
                picture
            });
            user = await user.save();
        }
        res.json({ user });
    } catch (e) {
        res.status(500).json({ error: e.message() })
    }
});

module.exports = authRouter;
