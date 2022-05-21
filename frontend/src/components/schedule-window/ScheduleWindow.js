import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import axios from 'axios';

import style from './ScheduleWindow.module.scss';
import LessonCard from '../lesson-card/LessonCard';
import { scheduleSliceActions } from '../../store/schedule-slice';
import Modal from '../modal/Modal';

const ScheduleWindow = props => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState();
	const [showErrorModal, setShowErrorModal] = useState(false);

	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: 'lesson',
		drop: item => onDropHandler(item.lesson.id, item.lesson),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const onDropHandler = (id, lesson) => {
		if (props.ifEditing) {
			axios
				.put('http://127.0.0.1:8000/api/tile/', {
					teacher: lesson.teacher,
					subject: lesson.subject,
					classroom: lesson.classroom,
					row: props.row,
					column: props.column,
				})
				.then(response => {
					console.log(response);
					setMessage('');
					dispatch(
						scheduleSliceActions.addLessonToSchedule({
							id: id,
							column: props.column,
							row: props.row,
						}),
					);
				})
				.catch(error => {
					console.log(error);
					setMessage(error.response.data);
					setShowErrorModal(true);
				});
		} else {
			axios
				.post('http://127.0.0.1:8000/api/tile/', {
					teacher: lesson.teacher,
					subject: lesson.subject,
					classroom: lesson.classroom,
					row: props.row,
					column: props.column,
				})
				.then(response => {
					console.log(response);
					setMessage('');
					dispatch(
						scheduleSliceActions.addLessonToSchedule({
							id: id,
							column: props.column,
							row: props.row,
						}),
					);
				})
				.catch(error => {
					console.log(error);
					setMessage(error.response.data);
					setShowErrorModal(true);
				});
		}
	};

	const onCloseErrorModalHandler = () => {
		setShowErrorModal(false);
	};

	return (
		<>
			{showErrorModal && (
				<Modal
					onClick={onCloseErrorModalHandler}
					title='Error!'
					onAcceptText='I understand'
					onAccept={onCloseErrorModalHandler}
				>
					<div className={style.info}>
						<h2>Can't add lesson at this time</h2>
						<p>{message}</p>
					</div>
				</Modal>
			)}
			<div className={style.window} ref={dropRef}>
				{Object.keys(props.lesson).length !== 0 && (
					<LessonCard
						lesson={props.lesson}
						onOpenEditClassModalHandler={props.onOpenEditClassModalHandler}
						onDeleteLessonHandler={props.onDeleteLessonHandler}
					/>
				)}
			</div>
		</>
	);
};

export default ScheduleWindow;
