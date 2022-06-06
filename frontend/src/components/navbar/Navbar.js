import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import style from "./Navbar.module.scss";

const Navbar = () => {
  const checkLogin = localStorage.getItem("access_token");
  const nav = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    nav("/");
  };

  return (
    <header className={style.header}>
      <NavLink className={`${style.navlink} ${style.header}`} to="/">
        <h1>School</h1>
      </NavLink>
      <div>
        {checkLogin ? (
          <nav>
            <NavLink className={style.navlink} to="/classes">
              <p>Classes</p>
            </NavLink>
            <NavLink className={style.navlink} to="/schedules">
              <p>Schedules</p>
            </NavLink>
            <NavLink className={style.navlink} to="/subjects">
              <p>Subjects</p>
            </NavLink>
            <NavLink className={style.navlink} to="/teachers">
              <p>Teachers</p>
            </NavLink>
            <NavLink className={style.navlink} to="/classrooms">
              <p>Classrooms</p>
            </NavLink>
          </nav>
        ) : (
          <nav>
            <NavLink className={style.navlink} to="/schedules">
              <p>Schedules</p>
            </NavLink>
          </nav>
        )}
        {checkLogin ? (
          <Button className={style.login} onClick={onLogout} text="Logout">
            <p>Logout</p>
          </Button>
        ) : (
          <NavLink className={style.login} to="/login">
            <p>Login</p>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
