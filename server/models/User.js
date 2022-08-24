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
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        threads: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thread'
            }
        ],
        webbs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Webb'
            }
        ],
        SpaceXs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SpaceX'
            }
        ]

    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// acquire thread count
userSchema.virtual('threadCount').get(function(){
    return this.threads.length;
});


const User = model('User', userSchema);

module.exports = User;