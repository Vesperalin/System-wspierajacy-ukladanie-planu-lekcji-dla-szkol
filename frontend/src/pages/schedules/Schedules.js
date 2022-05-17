import { NavLink } from 'react-router-dom';

const Schedules = () => {
	return (
		<div>
			<p>Tu będzie wypisywanie klas z planami</p>
			<p>usuwanie, podgląd i edycja tez</p>
			<NavLink to='/add-schedule'>
				<p>Tu przejście do tworzenia planu - temp</p>
			</NavLink>
			<NavLink to='/edit-schedule'>
				<p>Tu przejście do edycji planu - temp</p>
			</NavLink>
			<NavLink to='/preview-schedule'>
				<p>Tu przejście do podglądu planu - temp</p>
			</NavLink>
		</div>
	);
};

export default Schedules;
