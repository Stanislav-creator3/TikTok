import React from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "../feed/Feed";
import SearchFeed from "../search/SearchFeed";
import User from "../user/User";
import SingleVideo from "../videos/SingleVideo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/search" element={<SearchFeed />} />
      <Route path="/user/:uniqueId" element={<User />} />
      <Route path="/video/:uniqueId/:id" element={<SingleVideo />} />


    </Routes>
  );
};

export default AppRoutes;
