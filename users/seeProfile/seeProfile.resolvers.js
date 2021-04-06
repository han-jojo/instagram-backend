import client from "../../client";

export default {
    Query: {
        seeProfile: (_, {username}) => client.user.findUnique({
            where: {
                username,
            },
            include: {
                followings: true,
                followers: true,
            }
        }),
    },
};