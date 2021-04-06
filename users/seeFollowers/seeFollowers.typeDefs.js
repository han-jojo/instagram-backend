import { gql } from "apollo-server";

export default gql`
    type SeeFolloweresResult {
        ok: Boolean!
        error: String
        followers: [User]
        totalPages: Int
    }

    type Query {
        seeFollowers(username: String!, page: Int!): SeeFolloweresResult!
    }
`;