import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Modal from '../modal/Modal';
import style from './ClassModal.module.scss';
import { scheduleSliceActions } from '../../store/schedule-slice';

const EditClassModal = props => {
	const [subjects, setSubjects] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [classrooms, setClassrooms] = useState([]);
	const [selectionError, setSelectionError] = useState('');
	const [selectedTeacher, setSelectedTeacher] = useState({});
	const [selectedSubject, setSelectedSubject] = useState({});
	const [selectedClassroom, setSelectedClassroom] = useState({});
	const dispatch = useDispatch();
	const setErrorMessage = props.setErrorMessage;

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
	}, [setErrorMessage]);

	const onCloseModalHandler = () => {
		props.setShowEditClassModal(false);
	};

	const onEditLessonHandler = () => {
		if (
			Object.keys(selectedTeacher).length === 0 ||
			Object.keys(selectedSubject).length === 0 ||
			Object.keys(selectedClassroom).length === 0
		) {
			setSelectionError("Can't accept empty fields");
		} else {
			setSelectionError('');
			dispatch(
				scheduleSliceActions.editLesson({
					teacher: teachers.find(t => t.ID_Teacher === selectedTeacher.value),
					subject: subjects.find(s => s.ID_Subject === selectedSubject.value),
					classroom: classrooms.find(c => c.Classroom_no === selectedClassroom.value),
					prevTeacher: props.chosenClassForEdit.teacher,
					prevSubject: props.chosenClassForEdit.subject,
					prevClassroom: props.chosenClassForEdit.classroom,
				}),
			);
			props.setShowEditClassModal(false);
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
		<Modal
			onClick={onCloseModalHandler}
			title='Edit lesson'
			onAcceptText='Edit'
			onRejectText='Cancel'
			onAccept={onEditLessonHandler}
			onReject={onCloseModalHandler}
		>
			<h3>
				Teacher{' '}
				<span>
					(current:{' '}
					{`${props.chosenClassForEdit.teacher.Name} ${props.chosenClassForEdit.teacher.Surname}`})
				</span>
			</h3>
			<Select
				className={style.select}
				value={selectedTeacher}
				onChange={setSelectedTeacher}
				options={teachersOptions}
			/>
			<h3>
				Subject <span>(current: {props.chosenClassForEdit.subject.Subject_name})</span>
			</h3>
			<Select
				className={style.select}
				value={selectedSubject}
				onChange={setSelectedSubject}
				options={subjectsOptions}
			/>
			<h3>
				Classroom <span>(current: {props.chosenClassForEdit.classroom.Classroom_no})</span>
			</h3>
			<Select
				className={style.select}
				value={selectedClassroom}
				onChange={setSelectedClassroom}
				options={classroomsOptions}
			/>
			{selectionError !== '' && <p className={style.error}>{selectionError}</p>}
		</Modal>
	);
};

export default EditClassModal;
