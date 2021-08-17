import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: {},
});

export const { actions, reducer } = authSlice;
export default reducer;
