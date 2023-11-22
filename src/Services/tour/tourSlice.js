import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import tourService from "./tourService";
import { toast } from "react-toastify";

export const getTours = createAsyncThunk(
	"tours/get-tours",
	async (thunkAPI) => {
		try {
			return await tourService.getTours();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const createTour = createAsyncThunk(
	"tours/create-tour",
	async (tour, thunkAPI) => {
		try {
			return await tourService.createTour(tour);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateTour = createAsyncThunk(
	"tours/update-tour",
	async (tour, thunkAPI) => {
		try {
			return await tourService.updateTour(tour);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getTour = createAsyncThunk(
	"tours/get-tour",
	async (id, thunkAPI) => {
		try {
			return await tourService.getTour(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const deleteTour = createAsyncThunk(
	"tours/delete-tour",
	async (id, thunkAPI) => {
		try {
			return await tourService.deleteTour(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const resetState = createAction("Reset_all");

const initialState = {
	tours: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const tourSlice = createSlice({
	name: "tours",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTours.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTours.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.tours = action.payload.data;
			})
			.addCase(getTours.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(createTour.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTour.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createTour = action.payload.data;
				if (state.isSuccess) {
					toast.success("Thêm thành công");
				}
			})
			.addCase(createTour.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Lỗi");
				}
			})
			.addCase(updateTour.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTour.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.updateTour = action.payload.data;
				if (state.isSuccess) {
					toast.success("Chỉnh sửa thành công");
				}
			})
			.addCase(updateTour.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Lỗi");
				}
			})
			.addCase(getTour.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTour.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.getTour = action.payload.data;
			})
			.addCase(getTour.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Lỗi");
				}
			})
			.addCase(deleteTour.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTour.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.deleteTour = action.payload.data;
			})
			.addCase(deleteTour.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Lỗi");
				}
			})
			.addCase(resetState, () => initialState);
	},
});
export default tourSlice.reducer;
