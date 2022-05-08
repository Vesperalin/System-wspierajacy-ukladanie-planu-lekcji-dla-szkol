import { createSlice } from '@reduxjs/toolkit';

/*
w card i w schedule będzie
{
  teacher: obiekt nauczyciela,
  subject: obiekt przedmiotu,
  classroom: obiekt sali
}
*/

const scheduleSlice = createSlice({
	name: 'schedule',
	initialState: { chosenSchedule: [[], [], [], [], []], createdCards: [] },
	reducers: {
		clearSchedule(state) {
			state.chosenSchedule = [];
			state.createdCards = [];
		},
		addCard(state, action) {
			// TODO
		},
		addCardToSchedule(state, action) {
			// TODO
		},
		deleteCard(state, action) {
			// TODO
		},
		deleteCardFromSchedule(state, action) {
			// TODO
		},
		editCard(state, action) {
			// TODO - o ile robimy
		},
		editCardOnSchedule(state, action) {
			// TODO - o ile robimy
		},
	},
});

export const scheduleSliceActions = scheduleSlice.actions;

export default scheduleSlice;
