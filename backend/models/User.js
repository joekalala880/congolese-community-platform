const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String
    },

    middleName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    concern: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    resetPasswordToken: String,

    resetPasswordExpires: Date
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);