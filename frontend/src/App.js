import { Routes, Route } from 'react-router-dom';

import style from './App.module.scss';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Classes from './pages/classes/Classes';
import Schedules from './pages/schedules/Schedules';
import Subjects from './pages/subjects/Subjects';
import Teachers from './pages/teachers/Teachers';
import Login from './pages/login/Login';
import Classrooms from './pages/classrooms/Classrooms';
import AddClass from './pages/classes/add-class/AddClass';
import EditClass from './pages/classes/edit-class/EditClass';
import AddSubject from './pages/subjects/add-subject/AddSubject';
import EditSubject from './pages/subjects/edit-subject/EditSubject';
import AddTeacher from './pages/teachers/add-teacher/AddTeacher';
import EditTeacher from './pages/teachers/edit_teacher/EditTeacher';
import AddClassroom from './pages/classrooms/add-classroom/AddClassroom';
import EditClassroom from './pages/classrooms/edit-classroom/EditClassroom';

const App = () => {
	return (
		<div className={style.app}>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/classes' element={<Classes />} />
				<Route path='/add-class' element={<AddClass />} />
				<Route path='/edit-class' element={<EditClass />} />
				<Route path='/schedules' element={<Schedules />} />
				<Route path='/subjects' element={<Subjects />} />
				<Route path='/add-subject' element={<AddSubject />} />
				<Route path='/edit-subject' element={<EditSubject />} />
				<Route path='/teachers' element={<Teachers />} />
				<Route path='/add-teacher' element={<AddTeacher />} />
				<Route path='/edit-teacher' element={<EditTeacher />} />
				<Route path='/login' element={<Login />} />
				<Route path='/classrooms' element={<Classrooms />} />
				<Route path='/add-classroom' element={<AddClassroom />} />
				<Route path='/edit-classroom' element={<EditClassroom />} />
			</Routes>
		</div>
	);
};

export default App;
