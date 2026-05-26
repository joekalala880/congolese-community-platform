const mongoose = require("mongoose");

const newArrivalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    firstName: String,
    middleName: String,
    lastName: String,
    dateOfBirth: String,
    phone: String,
    email: String,
    address: String,
    idNumber: String,
    city: String,
    state: String,
    countryOfOrigin: String,
    currentLocation: String,
    language: String,

    concern: {
        type: String,
        enum: [
            "Housing",
            "Immigration",
            "Legal Help",
            "Food Assistance",
            "Church Support",
            "Job Help",
            "Healthcare",
            "Transportation",
            "School Support",
            "Other"
        ]
    },

    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model("NewArrival", newArrivalSchema);