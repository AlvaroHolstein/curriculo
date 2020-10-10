const { Schema, model } = require("../mongoConfig");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date
    },
})

const user = model("utilizadores", userSchema);

module.exports = user;