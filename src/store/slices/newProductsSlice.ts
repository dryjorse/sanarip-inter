import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMyKnownError, IStatus, INewProduct } from "../../@types";
import $api from "../../http";

export const getNewProducts = createAsyncThunk<
  INewProduct[],
  void,
  { rejectValue: IMyKnownError }
>("new-products", async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api("new-products");
    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface newProductsSliceState {
  status: IStatus;
  data: INewProduct[];
  errorMsg: string;
}

const initialState: newProductsSliceState = {
  status: "",
  data: [],
  errorMsg: "",
};

const newProductsSlice = createSlice({
  name: "newProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "";
    });
  },
});

export default newProductsSlice.reducer;
