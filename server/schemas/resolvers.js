const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get logged in user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }
            throw new AuthenticationError('Not Logged In');
        },

        // get all users
        users: async () => {
            return User.find()
        },

        // get single user 
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        },
        
    },
    Mutation: {
        // create user
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        // log in
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('email is incorrect.');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('password is incorrect.');
            }

            const token = signToken(user);
            console.log('Successfully logged in!');
            return { token, user };
        }
    }
};

module.exports = resolvers;