const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String 
        }

    type Query {
        users: [User]
        me: User
        user(username: String!): User 
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(email: String!, username: String!, password: String!): Auth
    }

    type Auth {
        token: ID!
        user: User
    }

`
;

module.exports = typeDefs;