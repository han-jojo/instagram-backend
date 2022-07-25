import { gql } from "apollo-server";

//파일 업로드 시 scalar Upload 타입 선언 필요

export default gql`
  scalar upload

  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      file: Upload
    ): MutationResponse!
  }
`;
