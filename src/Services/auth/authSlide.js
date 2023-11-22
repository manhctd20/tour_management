import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const getUserfromLocalStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

const initialState = {
	user: getUserfromLocalStorage,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};
export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			return await authService.login(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getAllUser = createAsyncThunk(
	"auth/get-user",
	async (thunkAPI) => {
		try {
			return await authService.getAllUser();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const deleteUser = createAsyncThunk(
	"auth/delete-user",
	async (id, thunkAPI) => {
		try {
			return await authService.deleteUser(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},
	extraReducers: (buildeer) => {
		buildeer
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				if (state.user.role === "admin") {
					toast.success("Đăng nhập thành công");
				} else {
					toast.error("Bạn không có quyền truy cập");
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
				if (state.isError) {
					toast.error("Tài khoản không chính xác");
				}
			})
			.addCase(getAllUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllUser.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload.data;
			})
			.addCase(getAllUser.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.deletedUser = action.payload.data;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			});
	},
});

export default authSlice.reducer;
