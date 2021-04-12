import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];

        if (caption) {
          //캡션을 검사한다
          hashtagObj = processHashtags(caption);
          //해쉬태그를 생성하거나 가져온다
        }
        //생성된 해쉬태그와 함게 사진을 저장한다
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...loggedInUser(
              hashtagObj.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtagObj,
                },
              }
            ),
          },
        });
        //해쉬태그에 사진을 저장한다
      }
    ),
  },
};
