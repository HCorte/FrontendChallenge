import {
  createSlice
} from '@reduxjs/toolkit';

// Check if a token exists in localStorage
const savedToken = localStorage.getItem("token");

const initialState = {
  isLoggedIn: savedToken ? true : false,
  token: savedToken || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  login,
  logout
} = authSlice.actions;
export default authSlice.reducer;