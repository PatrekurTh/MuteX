import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface ActivityState {
  activity: string;
}

/**
 * Default state object with initial values.
 */
const initialState: ActivityState = {
  activity: 'Nothing',
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActivity: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.activity>,
    ) => {
      state.activity = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getActivityState = (state: { activity: ActivityState }) =>
  state.activity;

// Exports all actions
export const { setActivity } = activitySlice.actions;

export default activitySlice.reducer;
