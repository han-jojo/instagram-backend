import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });

      if (!photo) {
        return {
          ok: false,
          error: "찾을 수 없는 게시글입니다.",
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "권한이 없습니다.",
        };
      } else {
        await client.photo.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
