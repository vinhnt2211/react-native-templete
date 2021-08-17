import { createAsyncThunk } from '@reduxjs/toolkit';
import NavigationUtils from '../../navigation/Utils';
import http from '../../api/http';

export const startUp = createAsyncThunk(
  'app/startUp',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const isSkip = getState().app.isSkip;
      if (!isSkip) {
        NavigationUtils.startIntoContent();
        return;
      }

      const user = getState().auth.user;
      const accessToken = getState().auth.accessToken;
      http.setAuthorizationHeader(accessToken);
      if (user) {
        NavigationUtils.startMainContent();
      } else {
        NavigationUtils.startLoginContent();
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
