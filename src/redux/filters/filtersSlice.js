import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.name = action.payload;
    },
  },
});

// Export the action to set the filter
export const { setFilter } = filtersSlice.actions;

// Export the reducer to be added to the store
export default filtersSlice.reducer;
