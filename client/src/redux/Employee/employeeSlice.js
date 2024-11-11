import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../../config/axiosInstance;";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    try {
      const response = await axiosInstance.get("/emp/employees");
      return response.data;
    } catch (error) {
      console.log(error, "error toolkit data");
      return error;
    }
  }
);
export const removeEmployee = createAsyncThunk(
  "employees/removeEmployees",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/emp/employees/${id}`);
      dispatch(fetchEmployees());
      return response.data;
    } catch (error) {
      console.log(error, "error toolkit data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployees",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    console.log(data, "data from update employee slice");
    try {
      const response = await axiosInstance.put(`/emp/employees/${id}`, data);
      dispatch(fetchEmployees());
      return response.data;
    } catch (error) {
      console.log(error, "error toolkit data");
      return rejectWithValue(error.response.data);
    }
  }
);
export const createEmployee = createAsyncThunk(
  "employees/createEmployees",
  async ({ data }, { dispatch, rejectWithValue }) => {
    console.log(data, "data from update employee slice");

    try {
      // Perform the POST request with the FormData
      const response = await axiosInstance.post(`/emp/employees`, data, {
        // Axios will automatically set the content-type to multipart/form-data
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly setting content-type for clarity
        },
      });

      // Dispatch the action to fetch employees after creating a new one
      dispatch(fetchEmployees());
      return response.data; // Return the response from the backend
    } catch (error) {
      console.log(error, "error toolkit data");
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error if previously set
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tours";
      });
  },
});

export default employeeSlice.reducer;
