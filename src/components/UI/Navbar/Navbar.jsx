import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../MyButton/MyButton";
import { AuthContext } from "../../../context";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false); // Добавлена точка с запятой
    localStorage.removeItem("auth"); // Исправлено на removeItem
  };

  return (
    <div className="navbar">
      <MyButton onClick={logout}>Выйти</MyButton>
      <div className="navbar__link">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;
