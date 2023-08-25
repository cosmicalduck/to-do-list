import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOptionsEnum } from "../../models/ISortOptions";

interface SortState {
  sortBy: SortOptionsEnum;
}

const initialState: SortState = {
  sortBy: SortOptionsEnum.CreationDate,
};

export const SortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    sortByChanged: (state, action: PayloadAction<SortOptionsEnum>) => {
      state.sortBy = action.payload;
    },
  },
});

export default SortSlice.reducer;
export const { sortByChanged } = SortSlice.actions;
