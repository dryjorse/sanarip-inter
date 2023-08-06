import { IMyKnownError, IStatus } from "./../../@types/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../@types";
import $api from "../../http";
import { RootState } from "../store";

export const getFavouriteProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: IMyKnownError; state: RootState }
>("favourite-products", async (_, { rejectWithValue, getState }) => {
  try {
    const { user } = getState();

    const { data } = await $api("products", {
      params: { id: user.data.favouriteProducts.join(",") },
    });

    return user.data.favouriteProducts.length ? data.results : [];
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface FavouriteProductsSliceState {
  status: IStatus;
  data: IProduct[];
  errorMsg: string;
}

const initialState: FavouriteProductsSliceState = {
  status: "",
  data: [],
  errorMsg: "",
};

const favouriteProductsSlice = createSlice({
  name: "favouriteProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavouriteProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getFavouriteProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getFavouriteProducts.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Что-то пошло не так";
    });
  },
});

export default favouriteProductsSlice.reducer;
