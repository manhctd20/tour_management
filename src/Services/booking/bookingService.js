import axios from "axios";
import { base_url } from "../../Services/BaseService";

const getBookings = async () => {
	const response = await axios.get(`${base_url}booking`, {
		withCredentials: true,
	});
	return response.data;
};

const bookingService = {
	getBookings,
};

export default bookingService;
