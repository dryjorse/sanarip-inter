import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMyKnownError, IStatus, IUser } from "../../@types";
import $api from "../../http";

export interface IRegistration {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export const registration = createAsyncThunk<
  IUser,
  IRegistration,
  { rejectValue: IMyKnownError }
>("registration", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post("registration", userData);
    return data.user;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

export interface ILogin {
  email: string;
  password: string;
}

export const login = createAsyncThunk<
  IUser,
  ILogin,
  { rejectValue: IMyKnownError }
>("login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post("login", userData);
    return data.user;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface IEdit {
  name?: string;
  surname?: string;
  email?: string;
  favouriteProducts?: number[];
}

export const edit = createAsyncThunk<
  IUser,
  IEdit,
  { rejectValue: IMyKnownError }
>("edit", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post("update", userData);
    return data.user;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: IMyKnownError }
>("logout", async (_, { rejectWithValue }) => {
  try {
    await $api.post("logout");
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface UserSliceState {
  data: IUser;
  isAuth: boolean;
  status: IStatus;
  errorMsg: string;
}

const initialState: UserSliceState = {
  data: {
    name: "",
    surname: "",
    email: "",
    favouriteProducts: [],
  },
  isAuth: false,
  status: "",
  errorMsg: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      state.isAuth = true;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Что-то пошло не так";
    });
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Что-то пошло не так";
    });
    builder.addCase(edit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(edit.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
      state.isAuth = true;
    });
    builder.addCase(edit.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Что-то пошло не так";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "success";
      state.data = {
        name: "",
        surname: "",
        email: "",
        favouriteProducts: [],
      };
      state.isAuth = false;
    });
  },
});

export default userSlice.reducer;
