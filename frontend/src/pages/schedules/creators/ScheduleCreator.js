import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import { scheduleSliceActions } from '../../../store/schedule-slice';
import ScheduleWindow from '../../../components/schedule-window/ScheduleWindow';

const ScheduleCreator = () => {
	const chosenSchedule = useSelector(state => state.schedule.chosenSchedule);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const location = useLocation();
	const dispatch = useDispatch();

	// TODO - change bo to modyfikuje w created lessons
	const onOpenEditClassModalHandler = lesson => {
		setChosenClassForEdit(lesson);
		setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = (column, row, lesson) => {
		dispatch(scheduleSliceActions.deleteLessonFromSchedule({ column, row, lesson }));
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
					{console.log(chosenSchedule)}
					{chosenSchedule.map((column, column_index) => {
						return (
							<div key={column_index}>
								{chosenSchedule[column_index].map((lesson, row_index) => {
									return (
										<div key={`${column_index}${row_index}}`}>
											<p>
												{column_index} {row_index}
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
