const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true
        }
    }
);

const User = mongoose.model("users", userSchema);

module.exports = User;