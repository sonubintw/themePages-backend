const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password must be 6 char minimum"]
    }
},
    { timpestamp: true }
)

const User = mongoose.model("USER", userSchema)
module.exports = User