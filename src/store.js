import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./Services/tour/tourSlice";
import authReducer from "./Services/auth/authSlide";
import bookingReducer from "./Services/booking/bookingSlide";

export const store = configureStore({
	reducer: {
		tour: tourReducer,
		auth: authReducer,
		booking: bookingReducer,
	},
});
