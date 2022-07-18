import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

/*
  ## Issue
- 파일 업로드 Maximum call stack size exceeded Error 에러 시
- node_modules 파일 삭제(package-lock.json은 지우면 안됨)
- `npm cache clean --force`
- `npm install`
- 명령어로 패키지 재설치 요망
*/

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          file,
        },
        { loggedInUser }
      ) => {
        //비밀번호 변경 시
        let encryptedPassword = null;

        if (newPassword) {
          encryptedPassword = await bcrypt.hash(newPassword, 10);
        }

        //프로필 사진 업로드 및 변경 시
        let avatarUrl = null;

        if (file) {
          const { createReadStream, filename } = await file;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/images/${newFilename}`;
        }

        //나머지 update
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(encryptedPassword && { password: encryptedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "프로필 수정이 실패하였습니다.",
          };
        }
      }
    ),
  },
  Upload: GraphQLUpload,
};
