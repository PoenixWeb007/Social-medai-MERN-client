import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {},
  token: null,
  friends: null,
  posts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMode, setLogin, setLogout, setPosts } = userSlice.actions;

export default userSlice.reducer;
