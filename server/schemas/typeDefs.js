const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        threads: [Thread] 
        }
    
    type Webb {
        _id: ID
        username: String
        createdAt: String
        webbTitle: String
        webbDescription: String
        threads: [Thread] 
        }
    
    type Thread {
        _id: ID
        username: String
        createdAt: String 
        threadTitle: String
        threadBody: String
        }

    type Query {
        users: [User]
        me: User
        user(username: String!): User
        allWebb: [Webb]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(email: String!, username: String!, password: String!): Auth
        createWebb(username: String!, webbTitle: String!, webbDescription: String!): Auth
        deleteWebb(_id: ID!): Webb
    }

    type Auth {
        token: ID!
        user: User
    }

`
;

module.exports = typeDefs;