import { createSlice } from '@reduxjs/toolkit';
import * as operations from '../AppRedux/operations';

const initialState = {
  initSuccess: false,
};

const appSlice = createSlice({
  name: 'nav',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [operations.startUp.fulfilled]: (state) => {
      state.initSuccess = true;
    },
  },
});

export const { reducer, actions } = appSlice;
export default reducer;
