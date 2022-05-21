import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import { scheduleSliceActions } from '../../../store/schedule-slice';
import ScheduleWindow from '../../../components/schedule-window/ScheduleWindow';
import { getLessonsHours } from '../../../store/schedule-slice';
import Button from '../../../components/button/Button';

const ScheduleCreator = () => {
	const chosenSchedule = useSelector(state => state.schedule.chosenSchedule);
	const lessonsHours = useSelector(state => state.schedule.lessonsHours);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getLessonsHours());
	}, [dispatch]);

	const onOpenEditClassModalHandler = lesson => {
		setChosenClassForEdit(lesson);
		setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = (column, row, lesson) => {
		dispatch(scheduleSliceActions.deleteLessonFromSchedule({ column, row, lesson }));
	};

	const determineDayName = column_number => {
		if (column_number === 0) return 'Monday';
		else if (column_number === 1) return 'Tuesday';
		else if (column_number === 2) return 'Wednesday';
		else if (column_number === 3) return 'Thursday';
		else if (column_number === 4) return 'Friday';
	};

	const determineHours = (startHour, startMinute, endHour, endMinute) => {
		const sh = ('0' + startHour).slice(-2);
		const sm = ('0' + startMinute).slice(-2);
		const eh = ('0' + endHour).slice(-2);
		const em = ('0' + endMinute).slice(-2);
		return `${sh}:${sm}-${eh}:${em}`;
	};

	const onSaveScheduleHandler = () => {
		// TODO - handle errors properly
		axios
			.post(
				'http://127.0.0.1:8000/api/lesson_plans/',
				JSON.stringify({ class: location.state.school_class, schedule: chosenSchedule }),
			)
			.then(response => console.log(response))
			.catch(error => {
				console.log(error);
				if (error.response.status === 400) {
					setErrorMessage(error.response.data.message);
				} else if (error.response.status === 404) {
					setErrorMessage(error.response.data.detail);
				} else {
					setErrorMessage('Unknown error occurred');
				}
			});
	};

	return (
		<div className={style['wrapper']}>
			<div className={style['toolbox-wrapper']}>
				<Toolbox
					showEditClassModal={showEditClassModal}
					setShowEditClassModal={setShowEditClassModal}
					chosenClassForEdit={chosenClassForEdit}
					setChosenClassForEdit={setChosenClassForEdit}
				/>
				<Button text='Save plan' onClick={onSaveScheduleHandler} />
			</div>
			<div className={style['panel-wrapper']}>
				<h1>{`${location.state.school_class.value.Class_no} - ${location.state.school_class.value.Year}`}</h1>
				<div className={style['plan-wrapper']}>
					{chosenSchedule.map((column, column_index) => {
						return (
							<div key={column_index}>
								<p className={style['day-name']}>{determineDayName(column_index)}</p>
								{chosenSchedule[column_index].map((lesson, row_index) => {
									return (
										<div key={`${column_index}${row_index}}`}>
											{column_index === 0 ? (
												<div className={style['window-with-wrapper']}>
													<p className={style['lesson-hours']}>
														{determineHours(
															lessonsHours[row_index].Start_hour,
															lessonsHours[row_index].Start_minute,
															lessonsHours[row_index].End_hour,
															lessonsHours[row_index].End_minute,
														)}
													</p>
													<ScheduleWindow
														key={`${column_index}${row_index}}`}
														lesson={lesson}
														column={column_index}
														row={row_index}
														onOpenEditClassModalHandler={onOpenEditClassModalHandler}
														onDeleteLessonHandler={onDeleteLessonHandler.bind(
															null,
															column_index,
															row_index,
														)}
													/>
												</div>
											) : (
												<ScheduleWindow
													key={`${column_index}${row_index}}`}
													lesson={lesson}
													column={column_index}
													row={row_index}
													onOpenEditClassModalHandler={onOpenEditClassModalHandler}
													onDeleteLessonHandler={onDeleteLessonHandler.bind(
														null,
														column_index,
														row_index,
													)}
												/>
											)}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ScheduleCreator;
