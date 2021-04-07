import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          //캡션을 검사한다
          //해쉬태그를 생성하거나 가져온다
        }
        //생성된 해쉬태그와 함게 사진을 저장한다
        //해쉬태그에 사진을 저장한다
      }
    ),
  },
};
