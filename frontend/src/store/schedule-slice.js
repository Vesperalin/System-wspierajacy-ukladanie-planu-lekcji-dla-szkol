import { createSlice } from '@reduxjs/toolkit';

/*
w lesson i w schedule będzie
{
  teacher: obiekt nauczyciela,
  subject: obiekt przedmiotu,
  classroom: obiekt sali
}
*/

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
		addLessonToSchedule(state, action) {
			// TODO
		},
		deleteLesson(state, action) {
			// TODO
		},
		deleteLessonFromSchedule(state, action) {
			// TODO
		},
		editLesson(state, action) {
			// TODO - o ile robimy
		},
		editLessonOnSchedule(state, action) {
			// TODO - o ile robimy
		},
	},
});

export const scheduleSliceActions = scheduleSlice.actions;

export default scheduleSlice;
