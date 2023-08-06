import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMyKnownError, IProduct, IStatus } from "../../@types";
import $api from "../../http";

export const getTrands = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: IMyKnownError }
>("trands", async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api("products", { params: { trands: true } });
    return data.results;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface TrandsSliceState {
  status: IStatus;
  data: IProduct[];
}

const initialState: TrandsSliceState = {
  status: "",
  data: [],
};

const trandsSlice = createSlice({
  name: "trandsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrands.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTrands.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getTrands.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default trandsSlice.reducer;
