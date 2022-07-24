import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    file: String!
    user: User!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    likes: Int!
    isMine: Boolean!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
