import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

export const getBookings = createAsyncThunk(
	"tours/get-bookings",
	async (thunkAPI) => {
		try {
			return await bookingService.getBookings();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const initialState = {
	bookings: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getBookings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBookings.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.bookings = action.payload.data;
			})
			.addCase(getBookings.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});
export default bookingSlice.reducer;
