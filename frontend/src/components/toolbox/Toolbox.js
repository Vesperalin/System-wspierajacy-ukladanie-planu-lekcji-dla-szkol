import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

import Button from '../button/Button';
import AddClassModal from '../lesson-modal/AddLessonModal';
import EditClassModal from '../lesson-modal/EditLessonModal';
import style from './Toolbox.module.scss';
import { scheduleSliceActions } from '../../store/schedule-slice';
import LessonCard from '../lesson-card/LessonCard';

const Toolbox = props => {
	const createdLessons = useSelector(state => state.schedule.createdLessons);
	const [errorMessage, setErrorMessage] = useState('');
	const [showAddClassModal, setShowAddClassModal] = useState(false);
	const dispatch = useDispatch();

	const [{ isOver }, dropRef] = useDrop(() => ({
		accept: 'lesson',
		drop: item => onDropHandler(item),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const onDropHandler = item => {
		dispatch(scheduleSliceActions.revertLessonFromSchedule({ item: item }));
		dispatch(scheduleSliceActions.calculateProgram());
	};

	const onOpenAddClassModalHandler = () => {
		setShowAddClassModal(true);
	};

	const onOpenEditClassModalHandler = lesson => {
		props.setChosenClassForEdit(lesson);
		props.setShowEditClassModal(true);
	};

	const onDeleteLessonHandler = lesson => {
		dispatch(scheduleSliceActions.deleteLesson(lesson));
	};

	const getSubjectColor = subject => {
		return props.subjectsColors.find(element => element.ID_Subject === subject.ID_Subject).Color;
	};

	return (
		<div className={style['toolbox-wrapper']}>
			{showAddClassModal && (
				<AddClassModal
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					setShowAddClassModal={setShowAddClassModal}
				/>
			)}
			{props.showEditClassModal && (
				<EditClassModal
					errorMessage={errorMessage}
					setErrorMessage={setErrorMessage}
					setShowEditClassModal={props.setShowEditClassModal}
					chosenClassForEdit={props.chosenClassForEdit}
				/>
			)}
			<Button text='+ Add' onClick={onOpenAddClassModalHandler} />
			<div className={style['card-wrapper']} ref={dropRef}>
				{createdLessons.map(lesson => {
					return (
						<LessonCard
							key={lesson.id}
							color={getSubjectColor(lesson.subject)}
							lesson={lesson}
							onOpenEditClassModalHandler={onOpenEditClassModalHandler}
							onDeleteLessonHandler={onDeleteLessonHandler}
						/>
					);
				})}
			</div>
			<div>{errorMessage !== '' && <p>{errorMessage}</p>}</div>
		</div>
	);
};

export default Toolbox;
