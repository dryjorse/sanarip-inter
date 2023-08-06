import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFilterItems, IMyKnownError, IStatus } from "../../@types";
import  $api  from "../../http";

export const getFilterItems = createAsyncThunk<
  IFilterItems,
  void,
  { rejectValue: IMyKnownError }
>("filter-items", async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api("filter-items");
    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface FilterItemsSliceState {
  status: IStatus;
  data: IFilterItems;
  errorMsg: string;
}

const initialState: FilterItemsSliceState = {
  status: "",
  data: {
    categories: [],
    brands: [],
    dimensions: [],
    seasons: [],
    colors: [],
  },
  errorMsg: "",
};

const filterItemsSlice = createSlice({
  name: "filterItemsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilterItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getFilterItems.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getFilterItems.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Что-то пошло не так";
    });
  },
});

export default filterItemsSlice.reducer;
