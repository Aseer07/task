import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/loginSlice";
import employeeReducer from "./Employee/employeeSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});
