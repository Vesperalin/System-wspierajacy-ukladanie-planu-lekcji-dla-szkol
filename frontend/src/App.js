import { Routes, Route } from 'react-router-dom';

import style from './App.module.scss';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Breaks from './pages/breaks/Breaks';
import Classes from './pages/classes/Classes';
import Programs from './pages/programs/Programs';
import Schedules from './pages/schedules/Schedules';
import Subjects from './pages/subjects/Subjects';
import Teachers from './pages/teachers/Teachers';
import Login from './pages/login/Login';

const App = () => {
	return (
		<div className={style.app}>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/breaks' element={<Breaks />} />
				<Route path='/classes' element={<Classes />} />
				<Route path='/programs' element={<Programs />} />
				<Route path='/schedules' element={<Schedules />} />
				<Route path='/subjects' element={<Subjects />} />
				<Route path='/teachers' element={<Teachers />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
