import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, login } from '../../store/user-slice'
import Button from '../button/Button';

import style from './Navbar.module.scss';
import { useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
	// const dispatch = useDispatch();
	// const user = useSelector((state) => state.user.user);

	// const handleLogout = () => {
	// 	console.log('hejka');
	// 	axios
	// 	.post('http://localhost:8000/auth/logout/')
	// 	.then(response => dispatch(logout()))
	// 	.catch(error => console.log(error));
	// };

	// useEffect(() => {
	// 	if(!user){
	// 		axios
	// 		.get('http://localhost:8000/users/me/')
	// 		.then(response => {
	// 			dispatch(login({email: response.data.email}))
	// 		});
	// 	}
	// }, []);

	return (
		<header className={style.header}>
			<NavLink className={`${style.navlink} ${style.header}`} to='/'>
				<h1>School</h1>
			</NavLink>
			<div>
				<nav>
					<NavLink className={style.navlink} to='/classes'>
						<p>Classes</p>
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
					<NavLink className={style.navlink} to='/classrooms'>
						<p>Classrooms</p>
					</NavLink>
				</nav>
				<NavLink className={style.login} to='/login'>
					<p>Login</p>
				</NavLink>
				{/* {!user && <NavLink className={style.login} to='/login'>
					<p>Login</p>
				</NavLink>}
				{user && <Button className={style.login} onClick={handleLogout} text='Logout'>
					<p>Logout</p>
				</Button>} */}
				
			</div>
		</header>
	);
};

export default Navbar;
