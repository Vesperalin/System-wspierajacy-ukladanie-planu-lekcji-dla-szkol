import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: { chosenSchedule: [[], [], [], [], []], createdLessons: [], nextLessonIndex: 1 },
	reducers: {
		clearSchedule(state) {
			state.chosenSchedule = [];
			state.createdLessons = [];
		},
		addLesson(state, action) {
			const teacher = action.payload.teacher;
			const subject = action.payload.subject;
			const classroom = action.payload.classroom;

			state.createdLessons.push({ teacher, subject, classroom, id: state.nextLessonIndex });

			state.nextLessonIndex += 1;
		},
		deleteLesson(state, action) {
			const lessonToDelete = action.payload;
			state.createdLessons = state.createdLessons.filter(lesson => lesson.id !== lessonToDelete.id);
		},
		editLesson(state, action) {
			const lessonEditData = action.payload;

			const foundLessonIndex = state.createdLessons.findIndex(
				lesson =>
					lesson.classroom.Classroom_no === lessonEditData.prevClassroom.Classroom_no &&
					lesson.subject.ID_Subject === lessonEditData.prevSubject.ID_Subject &&
					lesson.teacher.ID_Teacher === lessonEditData.prevTeacher.ID_Teacher,
			);

			state.createdLessons[foundLessonIndex] = {
				id: state.createdLessons[foundLessonIndex].id,
				teacher: lessonEditData.teacher,
				subject: lessonEditData.subject,
				classroom: lessonEditData.classroom,
			};
		},
	},
});

export const scheduleSliceActions = scheduleSlice.actions;

export default scheduleSlice;
