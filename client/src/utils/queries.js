import { gql } from '@apollo/client';

// get logged in user
export const QUERY_ME = gql`
    query getLoggedInUser {
        me {
            _id
            username
            email
        }
    }
`;

// Get all Webb 
export const QUERY_WEBB = gql`
    query AllWebb {
        allWebb {
            _id
            username
            createdAt
            webbTitle
            webbDescription
            threads {
                _id
                username
                createdAt
                threadTitle
                threadBody
            }
        }
    }
`;
