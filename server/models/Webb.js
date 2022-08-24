const {Schema, model } = require('mongoose');
const threadSchema = require('./Thread');
const dateFormat = require('../utils/dateFormat');

const webbSchema = new Schema (
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
        webbTitle: {
            type: String,
            required: 'Title is required!',
            minlength: 1,
            maxlength: 30
        },
        webbDescription: {
            type: String,
            required: 'Description is required!',
            minlength: 1,
            maxlength: 560
        },
        threads: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thread'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

webbSchema.virtual('threadCount').get(function(){
    return this.threads.length;
});

const Webb = model('Webb', webbSchema);

module.exports = Webb;

