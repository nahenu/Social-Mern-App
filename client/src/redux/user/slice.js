import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      (state.currentUser = null),
        (state.loading = false),
        (state.error = false);
    },
    SignupProcess: (state) => {
      state.loading = true;
    },
    SignupSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    SignupFailure: (state, action) => {
      (state.currentUser = null),
        (state.loading = false),
        (state.error = action.payload);
    },
    LoginFailure: (state, action) => {
      (state.currentUser = null),
        (state.loading = false),
        (state.error = action.payload);
    },
    LoginProcess: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    userLogoutSuccess: (state) => {
      (state.currentUser = null),
        (state.loading = false),
        (state.error = false);
    },
    updateImageSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = false);
    },
  },
});
export const {
  signOut,
  SignupProcess,
  SignupFailure,
  SignupSuccess,
  LoginFailure,
  LoginSuccess,
  LoginProcess,
  userLogoutSuccess,
  updateImageSuccess,
} = userSlice.actions;

export default userSlice.reducer;
