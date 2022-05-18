import { configureStore } from '@reduxjs/toolkit';

import scheduleSlice from './schedule-slice';

const store = configureStore({
	reducer: {
		schedule: scheduleSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
