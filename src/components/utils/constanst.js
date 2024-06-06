import UserLiked from "../user/UserLiked";
import UserVideos from "../user/UserVideos";

export const REGION = "ru";
export const USER_TABS = [
  {
    slug: "videos",
    title: "Videos",
    content: <UserVideos />,
  },
  {
    slug: "liked",
    title: "Liked",
    content: <UserLiked />,
  },
];
