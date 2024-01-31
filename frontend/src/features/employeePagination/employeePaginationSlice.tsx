import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EmployeePagination {
  page: number;
}

const initialSlice: EmployeePagination = {
  page: 1,
};

export const employeePaginationSlice = createSlice({
  name: "employeePagination",
  initialState: initialSlice,
  reducers: {
    nextPage: (state) => {
      state.page++;
    },
    previousPage: (state) => {
      state.page--;
    },
    checkMove: (state, action: PayloadAction<number>) => {
      const total = action.payload;
      const lower = (state.page - 1) * 10 + 1;
      const upper = total < state.page * 10 ? total : state.page * 10;
      if (total < lower) {
        state.page--;
      } else if (total > upper) {
        state.page++;
      }
    },
  },
});

export const { nextPage, previousPage, checkMove } = employeePaginationSlice.actions;

export default employeePaginationSlice.reducer;
