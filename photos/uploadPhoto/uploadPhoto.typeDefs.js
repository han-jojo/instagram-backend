import { gql } from "apollo-server";

export default gql`
scalar Upload

  type Mutation {
    uploadPhoto(file: String!, caption: String): Photo
  }
`;
