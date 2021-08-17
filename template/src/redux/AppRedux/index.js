import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';

const initialState = {
  language: null,
  isSkip: false,
  initSuccess: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
    markSkipIntro: (state, { payload }) => {
      state.isSkip = payload;
    },
  },
  extraReducers: {
    [operations.startUp.fulfilled]: (state) => {
      state.initSuccess = true;
    },
  },
});

export const { reducer, actions } = appSlice;
export default reducer;
