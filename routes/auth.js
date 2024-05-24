const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth");
const { default: mongoose } = require("mongoose");

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
        const token = jwt.sign({
            id: user._id
        }, "passwordKey");
        res.json({ user, token });
    } catch (e) {
        // console.log(e.message);
        res.status(500).json({ error: e.message });
    }
});

authRouter.get("/api/v1/user", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        user, token: req.token
    });
});

module.exports = authRouter;
