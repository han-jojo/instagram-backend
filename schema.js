import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

/*
__filename 은 현재 실행 중인 파일 경로
__dirname 은 현재 실행 중인 폴더 경로
*/

const typeFiles = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const resolverFiles = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(typeFiles);
export const resolvers = mergeResolvers(resolverFiles);
