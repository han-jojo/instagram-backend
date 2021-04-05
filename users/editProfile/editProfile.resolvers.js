import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, protectResolver }
) => {
  let uglyPassword = null;
  if (newPassword) uglyPassword = await bcrypt.hash(newPassword, 10);

  const updateUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });

  if (updateUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};
export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
