import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Modal from '../modal/Modal';
import style from './LessonModal.module.scss';
import { scheduleSliceActions } from '../../store/schedule-slice';

const EditClassModal = props => {
	const [subjects, setSubjects] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [classrooms, setClassrooms] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [selectedClassroom, setSelectedClassroom] = useState(null);
	const [selectionError, setSelectionError] = useState('');
	const setErrorMessage = props.setErrorMessage;
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
					const teacher = responses[1].data.find(
						elem => elem.ID_Teacher === props.chosenClassForEdit.teacher.ID_Teacher,
					);
					const subject = responses[0].data.find(
						elem => elem.ID_Subject === props.chosenClassForEdit.subject.ID_Subject,
					);
					const classroom = responses[2].data.find(
						elem => elem.Classroom_no === props.chosenClassForEdit.classroom.Classroom_no,
					);
					setSelectedTeacher({
						value: teacher.ID_Teacher,
						label: `${teacher.Name} ${teacher.Surname}`,
					});
					setSelectedSubject({
						value: subject.ID_Subject,
						label: subject.Subject_name,
					});
					setSelectedClassroom({
						value: classroom.Classroom_no,
						label: classroom.Classroom_no,
					});
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
	}, [
		props.chosenClassForEdit.classroom.Classroom_no,
		props.chosenClassForEdit.subject.ID_Subject,
		props.chosenClassForEdit.teacher.ID_Teacher,
		setErrorMessage,
	]);

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
				scheduleSliceActions.editLessonInToolboxAndSchedule({
					id: props.chosenClassForEdit.id,
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
			<h3>Teacher</h3>
			<Select
				className={style.select}
				value={selectedTeacher}
				onChange={setSelectedTeacher}
				options={teachersOptions}
			/>
			<h3>Subject</h3>
			<Select
				className={style.select}
				value={selectedSubject}
				onChange={setSelectedSubject}
				options={subjectsOptions}
			/>
			<h3>Classroom</h3>
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
