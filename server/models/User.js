const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


const User = model('User', userSchema);

module.exports = User;