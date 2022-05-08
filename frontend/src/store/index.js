import { configureStore } from '@reduxjs/toolkit';

import scheduleSlice from './schedule-slice';

const store = configureStore({
	reducer: {
		schedule: scheduleSlice.reducer,
	},
});

export default store;
