import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Toolbox from '../../../components/toolbox/Toolbox';
import style from './Creator.module.scss';
import LessonCard from '../../../components/lesson-card/LessonCard';
import { scheduleSliceActions } from '../../../store/schedule-slice';

const ScheduleCreator = () => {
	const createdLessons = useSelector(state => state.schedule.createdLessons);
	const [showEditClassModal, setShowEditClassModal] = useState(false);
	const [chosenClassForEdit, setChosenClassForEdit] = useState({});
	const dispatch = useDispatch();

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
				{
					// TODO - to jest tu tylko chwilowo - docelowo tu będzie siatka
					createdLessons.map(lesson => {
						return (
							<LessonCard
								key={lesson.id}
								lesson={lesson}
								onOpenEditClassModalHandler={onOpenEditClassModalHandler}
								onDeleteLessonHandler={onDeleteLessonHandler}
							/>
						);
					})
				}
			</div>
		</div>
	);
};

export default ScheduleCreator;
