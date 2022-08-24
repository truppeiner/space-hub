const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const threadSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        threadTitle: {
            type: String,
            required: 'Title is required',
            minlength: 1,
            maxlength: 100
        },
        threadBody: {
            type: String,
            required: 'Body is required',
            minlength: 1,
            maxlength: 500
        }
    }
);

const Thread = model('Thread', threadSchema);

module.exports = Thread;