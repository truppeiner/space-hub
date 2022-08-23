const { User } = require('../models');
const { AuthenticationError} = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get logged in user
        me: async (parent, args, context) => {
            if (context.user){
                const userData = await User.findOne({ _id: context.user._id })
                    .select('__v -password')

                return userData
            }
            throw new AuthenticationError('Not logged in!');
        },
        
        // get all users
        users: async () => {
            return User.find()
        }
    },
    // Mutation: {
    //     // create user
    //     createUser: async (parent, args) => {
    //         const user = await User.create(args);

    //         return { user };
    //     }
    // }
};

module.exports = resolvers;