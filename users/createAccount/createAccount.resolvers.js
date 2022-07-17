import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("이미 존재하는 username/E-Mail입니다.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: encryptedPassword,
          },
        });

        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};
