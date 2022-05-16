import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/Modal';
import axios from 'axios';
import Select from 'react-select';

import Button from '../button/Button';
import style from './Toolbox.module.scss';
import { scheduleSliceActions } from '../../store/schedule-slice';
import editImage from '../../assets/edit.png';
import deleteImage from '../../assets/delete.png';

const Toolbox = () => {
	const createdLessons = useSelector(state => state.schedule.createdLessons);
	const [subjects, setSubjects] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [classrooms, setClassrooms] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [selectedTeacher, setSelectedTeacher] = useState({});
	const [selectedSubject, setSelectedSubject] = useState({});
	const [selectedClassroom, setSelectedClassroom] = useState({});
	const [selectionError, setSelectionError] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.all([
				axios.get('http://127.0.0.1:8000/api/subjects/'),
				axios.get('http://127.0.0.1:8000/api/teachers/'),
				axios.get('http://127.0.0.1:8000/api/classrooms/'),
			])
			.then(
				axios.spread((...responses) => {
					setSubjects(responses[0].data);
					setTeachers(responses[1].data);
					setClassrooms(responses[2].data);
					setErrorMessage('');
				}),
			)
			.catch(error => {
				if (error.response.status === 400) {
					setErrorMessage(error.response.data.message);
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
	}, []);

	const onOpenModalHandler = () => {
		setShowModal(true);
	};

	const onCloseModalHandler = () => {
		setShowModal(false);
	};

	const onAddLessonHandler = () => {
		if (
			Object.keys(selectedTeacher).length === 0 ||
			Object.keys(selectedSubject).length === 0 ||
			Object.keys(selectedClassroom).length === 0
		) {
			setSelectionError("Can't accept empty fields");
		} else {
			setSelectionError('');
			dispatch(
				scheduleSliceActions.addLesson({
					teacher: teachers.find(t => t.ID_Teacher === selectedTeacher.value),
					subject: subjects.find(s => s.ID_Subject === selectedSubject.value),
					classroom: classrooms.find(
						c => c.Classroom_no === selectedClassroom.value,
					),
				}),
			);
			setShowModal(false);
		}
	};

	const teachersOptions = teachers.map(teacher => ({
		value: teacher.ID_Teacher,
		label: `${teacher.Name} ${teacher.Surname}`,
	}));

	const subjectsOptions = subjects.map(subject => ({
		value: subject.ID_Subject,
		label: subject.Subject_name,
	}));

	const classroomsOptions = classrooms.map(classroom => ({
		value: classroom.Classroom_no,
		label: classroom.Classroom_no,
	}));

	return (
		<div className={style['toolbox-wrapper']}>
			{showModal && (
				<Modal
					onClick={onCloseModalHandler}
					title='Add lesson'
					onAcceptText='Add'
					onRejectText='Cancel'
					onAccept={onAddLessonHandler}
					onReject={onCloseModalHandler}
				>
					<Select
						className={style.select}
						value={selectedTeacher}
						onChange={setSelectedTeacher}
						options={teachersOptions}
					/>
					<Select
						className={style.select}
						value={selectedSubject}
						onChange={setSelectedSubject}
						options={subjectsOptions}
					/>
					<Select
						className={style.select}
						value={selectedClassroom}
						onChange={setSelectedClassroom}
						options={classroomsOptions}
					/>
					{selectionError !== '' && (
						<p className={style.error}>{selectionError}</p>
					)}
				</Modal>
			)}
			<Button text='+ Add' onClick={onOpenModalHandler} />
			<div className={style['card-wrapper']}>
				{createdLessons.map(lesson => {
					return (
						<div className={style['card']} key={lesson.id}>
							<div className={style['upper']}>
								<p>{lesson.subject.Subject_name}</p>
								<div>
									<img src={editImage} alt='edit' />
									<img src={deleteImage} alt='edit' />
								</div>
							</div>
							<div className={style['lower']}>
								<p>{`${lesson.teacher.Name} ${lesson.teacher.Surname}`}</p>
								<p>s. {lesson.classroom.Classroom_no}</p>
							</div>
						</div>
					);
				})}
			</div>
			<div>{errorMessage !== '' && <p>{errorMessage}</p>}</div>
		</div>
	);
};

export default Toolbox;
