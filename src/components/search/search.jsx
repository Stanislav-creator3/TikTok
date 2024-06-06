import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import style from "./search.module.scss";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const isMatch = useMatch("search")
  const [value, setValue] = useState("");

  const handelChange = ({ target: { value: val } }) => {
    setValue(val);
  };

  useEffect(() => {
    if(isMatch) return

    setValue('')
  }, [location, isMatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    const val = value.trim()

    if(!val) return

    navigate(`/search?q=${val}`)
  };

  return (
    <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={style.item}>
        <SearchIcon />
        <input
          className={style.input}
          type="text"
          name="search"
          placeholder="Найти"
          value={value}
          onChange={handelChange}
        />
      </div>
      <button className={style.button} type="submit">
        Найти
      </button>
    </form>
  );
};

export default Search;
