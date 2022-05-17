import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import LessonCard from '../../../components/lesson-card/LessonCard';
import { scheduleSliceActions } from '../../../store/schedule-slice';

const ScheduleCreator = () => {
	const chosenSchedule = useSelector(state => state.schedule.chosenSchedule);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const location = useLocation();
	const dispatch = useDispatch();

	//console.log(location.state.school_class.Class_no);

	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: 'lesson',
		drop: item => onDropHandler(item.id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	}));

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
			<div className={style['panel-wrapper']} ref={dropRef}>
				{
					chosenSchedule[0].length > 0 && console.log(chosenSchedule[0])
					// TODO - to potem zamienić na siatkę to co tu w środku
				}
				{chosenSchedule[0].length > 0 && (
					<>
						<LessonCard
							lesson={chosenSchedule[0][0]}
							onOpenEditClassModalHandler={onOpenEditClassModalHandler}
							onDeleteLessonHandler={onDeleteLessonHandler}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default ScheduleCreator;
