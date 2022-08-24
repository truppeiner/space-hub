const { AuthenticationError } = require('apollo-server-express');
const { User, Webb, Thread } = require('../models');
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
                .populate('threads')
                .populate('webbs')
                .sort({ createdAt: -1 })
        },

        // get single user 
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        },

        // get Webb section
        allWebb: async () => {
            return Webb.find()
                .populate('threads')
                .sort({ createdAt: -1 })
        },

        // get all threads
        threads: async () => {
            return Thread.find()
                .sort({ createdAt:-1 })
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
        },

        // create webb
        createWebb: async ( parent, args , context ) => {
            if (context.user){
                // create webb
                const webb = await Webb.create({ ...args, username: context.user.username });

                // push webb onto user data
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { webbs: webb._id }},
                    { new: true }
                );
                return webb;
            }
            throw new AuthenticationError('You must be logged in to make a Webb');
        },

        // delete webb
        deleteWebb: async (parent, { _id }, context) => {
            if (context.user){
                // delete webb
                const wipeWebb = await Webb.findByIdAndDelete(_id);
                return wipeWebb;
            }
            throw new AuthenticationError('You must be logged in to do this')
        },

        // create thread
        createThread: async( parent, args, context ) => {
            if (context.user){
                // create thread
                const thread = await Thread.create({ ...args, username: context.user.username });

                // push thread onto user data 
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { threads: thread._id }},
                        { new: true}
                    );
                    return thread;
            }
            throw new AuthenticationError('You must be logged in to make a thread');
        },

        // create thread and push to webb
        createWebbThread: async( parent, args, context ) => {
            if (context.user){
                // create thread
                const thread = await Thread.create({ ...args, username: context.user.username });

                // push thread onto user data 
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $push: { threads: thread._id }},
                        { new: true }
                    );
                
                // push thread onto webb data
                    await Webb.findOneAndUpdate(
                        { _id: args.webbId},
                        { $push: {threads: thread._id }},
                        { new: true }
                    )
                    return thread;
            }
            throw new AuthenticationError('You must be logged in to make a thread for the webb');
        }, 
    }
};

module.exports = resolvers;