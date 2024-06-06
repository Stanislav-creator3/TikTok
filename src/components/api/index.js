import { request } from "../utils/common";

export const fetchUserPosts = async ({uniqueId, cursor}) => {
    const response = await request({
      path: `user/posts?unique_id=${uniqueId}&count=10&cursor=${cursor}`,
    });
  
    return response;
  };