import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { Alert } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import Spinner from "../spinner/Spinner";

import style from "./user.module.scss";
import { formatNum, replaceWithBr } from "../utils/common";
import UserTabs from "./UserTabs";

const User = () => {
  const { uniqueId } = useParams();

  const { data, code, error, isLoading } = useUser(uniqueId);

  if (code === -1) {
    return <Alert severity="error">{error || "Пользователь не найден"}</Alert>;
  }

  if (isLoading) return <Spinner />;

  const {
    stats: { followingCount, followerCount, heartCount, videoCount },
    user,
  } = data;

  const statsData = [
    {
      text: "Following",
      count: followingCount,
    },
    {
      text: "Followers",
      count: followerCount,
    },
    {
      text: "Hearts",
      count: heartCount,
    },
    {
      text: "Videos",
      count: videoCount,
    },
  ];

  return (
    <div className={style.user}>
    
      <div className={style["user-info"]}>
      <div
        className={style["user-avatar"]}
        style={{ backgroundImage: `url(${user.avatarMedium})` }}
      />
      <div className={style["user-name"]}>
        <div className={style["user-unique"]}>{uniqueId}</div>
        <div className={style["user-nickname"]}>{user.nickname}</div>
        </div>
      </div>
      <ul className={style["user-stats"]}>
        {statsData.map(({text, count}) => <li key={text} className={style["user-stats__item"]}>
          <span>{formatNum(count)}</span>
          <p>{text}</p>
        </li>)}
      </ul>
      {!user.signature ? <p>Not bio yet.</p> : (
        <div className={style["user-signature"]} dangerouslySetInnerHTML={{__html: replaceWithBr(user.signature) }}
        />
      )}
      {!user.privateAccount ? (<UserTabs openFavorite ={user.openFavorite}/>) : (
        <p className={style.private}>
          <span>Данный аккаунт приватный</span>
          <LockIcon/>
        </p>
      )}
    </div>
  );
};

export default User;
