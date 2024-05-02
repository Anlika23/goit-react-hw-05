import { NavLink } from "react-router-dom";
import css from './Navigation.module.css';
import clsx from "clsx";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    return (
        <header>
            <nav className={css.conrainerNav}>
                <NavLink to="/" className={getNavLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/movies" className={getNavLinkClass}>
                    Movies
                </NavLink>
            </nav>
        </header>
    )
}