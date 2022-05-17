import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import LessonCard from '../../../components/lesson-card/LessonCard';
import { scheduleSliceActions } from '../../../store/schedule-slice';
import ScheduleWindow from '../../../components/schedule-window/ScheduleWindow';

const ScheduleCreator = () => {
	const chosenSchedule = useSelector(state => state.schedule.chosenSchedule);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const location = useLocation();
	const dispatch = useDispatch();

	// TODO - wywalic to
	const onDropHandler = id => {
		dispatch(scheduleSliceActions.addLessonToSchedule(id));
	};

	const onOpenEditClassModalHandler = lesson => {
		setChosenClassForEdit(lesson);
		setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = lesson => {
		dispatch(scheduleSliceActions.deleteLesson(lesson));
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
			</div>
			<div className={style['panel-wrapper']}>
				<h1>{`${location.state.school_class.value.Class_no} - ${location.state.school_class.value.Year}`}</h1>
				<div className={style['plan-wrapper']}>
					{chosenSchedule.map((column, column_index) => {
						return (
							<div key={column_index}>
								{chosenSchedule[column_index].map((lesson, row_index) => {
									return (
										<ScheduleWindow
											key={`${column_index}${row_index}}`}
											lesson={lesson}
											column={column_index}
											row={row_index}
											onOpenEditClassModalHandler={onOpenEditClassModalHandler}
											onDeleteLessonHandler={onDeleteLessonHandler}
										/>
									);
								})}
							</div>
						);
					})}
				</div>

				{
					//chosenSchedule[0].length > 0 && console.log(chosenSchedule[0])
					// TODO - to potem zamienić na siatkę to co tu w środku
				}
				{/* {chosenSchedule[0].length > 0 && (
					<>
						<LessonCard
							lesson={chosenSchedule[0][0]}
							onOpenEditClassModalHandler={onOpenEditClassModalHandler}
							onDeleteLessonHandler={onDeleteLessonHandler}
						/>
					</>
				)} */}
			</div>
		</div>
	);
};

export default ScheduleCreator;
