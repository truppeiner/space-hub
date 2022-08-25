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

