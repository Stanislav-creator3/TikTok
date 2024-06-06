import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";

import { USER_TABS } from "../utils/constanst";

import style from "./user.module.scss";
import { Alert } from "@mui/material";

const UserTabs = ({ openFavorite }) => {
  const [activeTab, setActiveTab] = useState(USER_TABS[0]);
  return (
    <div className={style["user-tabs"]}>
      <ul className={style["user-tabs__items"]}>
        {USER_TABS.map((tab) => {
          const { slug, title } = tab;

          return (
            <li
              key={slug}
              onClick={() => setActiveTab(tab)}
              className={`${style["user-tab"]} ${
                activeTab.slug === slug ? style.active : ""
              }`}
            >
              {!openFavorite && slug === "liked" && <LockIcon />}
              <span>{title}</span>
            </li>
          );
        })}
      </ul>
      <div className={style["user-tabs__content"]}>
        {!openFavorite && activeTab.slug === "liked" ? (
          <Alert severity="info">Пользователь скрыл понравившиеся видео</Alert>
        ) : (
          activeTab.content
        )}
      </div>
    </div>
  );
};

export default UserTabs;
