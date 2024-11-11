import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../../config/axiosInstance;";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      console.log(response, "response from Auth Slice");
      // Store user's token in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.userName);
      return response.data;
    } catch (error) {
      console.log(error, "error from slice");
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userName = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userName = action.payload.userName;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
