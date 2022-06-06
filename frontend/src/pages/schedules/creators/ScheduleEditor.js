import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import { scheduleSliceActions } from '../../../store/schedule-slice';
import ScheduleWindow from '../../../components/schedule-window/ScheduleWindow';
import { getLessonsHoursAndProgram } from '../../../store/schedule-slice';
import Button from '../../../components/button/Button';
import Modal from '../../../components/modal/Modal';
import { getDayName, getHours } from './ScheduleCreator';
import ProgramPanel from '../../../components/program-panel/ProgramPanel';

const ScheduleEditor = () => {
	const chosenSchedule = useSelector(state => state.schedule.chosenSchedule);
	const lessonsHours = useSelector(state => state.schedule.lessonsHours);
	const programForClass = useSelector(state => state.schedule.currentProgramForClass);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const [message, setMessage] = useState([]);
	const [openWarningModal, setOpenWarningModal] = useState(false);
	const [openErrorModal, setOpenModalError] = useState(false);
	const [colors, setColors] = useState([]);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			getLessonsHoursAndProgram({
				school_class: { value: location.state.school_class },
				isCreator: 2,
			}),
		);

		axios
			.get(`http://127.0.0.1:8000/api/lesson_plans/${location.state.school_class.ID_Class}/`)
			.then(response => {
				dispatch(scheduleSliceActions.assignLessonsToPlan(response.data));
				dispatch(scheduleSliceActions.calculateProgram());
			})
			.catch(error => {
				console.log(error);
			});

		axios
			.get('http://127.0.0.1:8000/api/subjects_with_colors/')
			.then(response => setColors(response.data));
	}, [dispatch, location.state.school_class, location.state.school_class.ID_Class]);

	const onOpenEditClassModalHandler = lesson => {
		setChosenClassForEdit(lesson);
		setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = (column, row, lesson) => {
		dispatch(scheduleSliceActions.deleteLessonFromSchedule({ column, row, lesson }));
		dispatch(scheduleSliceActions.calculateProgram());
	};

	const onSaveScheduleHandler = () => {
		axios
			.put(
				'http://127.0.0.1:8000/api/lesson_plans/' + location.state.school_class.ID_Class + '/',
				JSON.stringify({ class: location.state.school_class, schedule: chosenSchedule }),
			)
			.then(response => navigate('/schedules'))
			.catch(error => {
				setMessage(error.response.data.message);
				if (error.response.data.warning) {
					setOpenWarningModal(true);
				} else {
					setOpenModalError(true);
				}
			});
	};

	const onCloseWarningHandler = () => {
		setOpenWarningModal(false);
		navigate('/schedules');
	};

	const onCloseErrorModal = () => {
		setOpenModalError(false);
	};

	return (
		<div className={style['wrapper']}>
			{openWarningModal && (
				<Modal
					onClick={onCloseWarningHandler}
					title='Warning!'
					onAcceptText='I understand'
					onAccept={onCloseWarningHandler}
				>
					<div className={style.modal}>
						<h2>Plan saved</h2>
						<h3>Remember to edit this plan later</h3>
						{message.map((m, index) => {
							return <p key={index}>{m}</p>;
						})}
					</div>
				</Modal>
			)}
			{openErrorModal && (
				<Modal
					onClick={onCloseErrorModal}
					title='Error!'
					onAcceptText='Edit plan'
					onRejectText='Cancel'
					onAccept={onCloseErrorModal}
					onReject={() => navigate('/schedules')}
				>
					<div className={style.modal}>
						<h2>Plan not saved</h2>
						{message.map((m, index) => {
							return <p key={index}>{m}</p>;
						})}
					</div>
				</Modal>
			)}
			<div className={style['toolbox-wrapper']}>
				<ProgramPanel program={programForClass} />
				<Toolbox
					showEditClassModal={showEditClassModal}
					setShowEditClassModal={setShowEditClassModal}
					chosenClassForEdit={chosenClassForEdit}
					setChosenClassForEdit={setChosenClassForEdit}
					subjectsColors={colors}
				/>
				<div className={style['button-wrapper']}>
					<Button text='Save plan' onClick={onSaveScheduleHandler} />
					<button onClick={() => navigate('/schedules')} className={style.button}>
						&larr; Back
					</button>
				</div>
			</div>
			<div className={style['panel-wrapper']}>
				<div className={style['panel']}>
					<h1>{`${location.state.school_class.Class_no} - ${location.state.school_class.Year}`}</h1>
					<div className={style['plan-wrapper']}>
						{lessonsHours.length > 0 &&
							chosenSchedule.map((column, column_index) => {
								return (
									<div key={column_index}>
										<p className={style['day-name']}>{getDayName(column_index)}</p>
										{chosenSchedule[column_index].map((lesson, row_index) => {
											return (
												<div key={`${column_index}${row_index}}`}>
													{column_index === 0 ? (
														<div className={style['window-with-wrapper']}>
															<p className={style['lesson-hours']}>
																{getHours(
																	lessonsHours[row_index].Start_hour,
																	lessonsHours[row_index].Start_minute,
																	lessonsHours[row_index].End_hour,
																	lessonsHours[row_index].End_minute,
																)}
															</p>
															<ScheduleWindow
																key={`${column_index}${row_index}}`}
																lesson={lesson}
																class={location.state.school_class}
																column={column_index}
																row={row_index}
																onOpenEditClassModalHandler={onOpenEditClassModalHandler}
																onDeleteLessonHandler={onDeleteLessonHandler.bind(
																	null,
																	column_index,
																	row_index,
																)}
																subjectsColors={colors}
															/>
														</div>
													) : (
														<ScheduleWindow
															key={`${column_index}${row_index}}`}
															lesson={lesson}
															class={location.state.school_class}
															column={column_index}
															row={row_index}
															onOpenEditClassModalHandler={onOpenEditClassModalHandler}
															onDeleteLessonHandler={onDeleteLessonHandler.bind(
																null,
																column_index,
																row_index,
															)}
															subjectsColors={colors}
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
		</div>
	);
};

export default ScheduleEditor;
