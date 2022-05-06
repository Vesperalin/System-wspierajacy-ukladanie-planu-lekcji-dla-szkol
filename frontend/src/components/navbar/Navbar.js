import { NavLink } from 'react-router-dom';

import style from './Navbar.module.scss';

const Navbar = () => {
	return (
		<header className={style.header}>
			<NavLink className={`${style.navlink} ${style.header}`} to='/'>
				<h1>School</h1>
			</NavLink>
			<div>
				<nav>
					<NavLink className={style.navlink} to='/breaks'>
						<p>Breaks</p>
					</NavLink>
					<NavLink className={style.navlink} to='/classes'>
						<p>Classes</p>
					</NavLink>
					<NavLink className={style.navlink} to='/programs'>
						<p>Programs</p>
					</NavLink>
					<NavLink className={style.navlink} to='/schedules'>
						<p>Schedules</p>
					</NavLink>
					<NavLink className={style.navlink} to='/subjects'>
						<p>Subjects</p>
					</NavLink>
					<NavLink className={style.navlink} to='/teachers'>
						<p>Teachers</p>
					</NavLink>
				</nav>
				<NavLink className={style.login} to='/login'>
					<p>Login</p>
				</NavLink>
			</div>
		</header>
	);
};

export default Navbar;
