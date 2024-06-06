import React, { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import Search from "../search/search";

const Header = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [position, setPosition] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          highlightColor: 0x0a0a0a,
          midtoneColor: 0x8aff00,
          lowlightColor: 0x0a0a0a,
          baseColor: 0x0a0a0a,
          minHeight: 60.0,
          blurFactor: 0.9,
          speed: 2.0,
          zoom: 0.3,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(()=> {
    const handleScroll = () => {
       let moving = window.scrollY
       
       setVisible(position > moving);
       setPosition(moving)
    };
    window.addEventListener("scroll", handleScroll);
    return(() => {
       window.removeEventListener("scroll", handleScroll);
    })
})
const cls = visible ? style.visible : style.hidden;

  return (
    <header className={`${style.header} ${cls}`} ref={vantaRef}>
      <Link to="/" style={{ color: "white" }}>
        <h1 className={style.title}>TOK TIK</h1>
      </Link>
      <Search />
    </header>
  );
};

export default Header;
