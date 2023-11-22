import axios from "axios";
import { base_url } from "../../Services/BaseService";

const getTours = async () => {
	const response = await axios.get(`${base_url}tours`);
	return response.data;
};

const createTour = async (tour) => {
	const response = await axios.post(`${base_url}tours`, tour, {
		withCredentials: true,
	});
	return response.data;
};

const updateTour = async ({ id, ...rest }) => {
	const response = await axios.put(`${base_url}tours/${id}`, rest, {
		withCredentials: true,
	});
	return response.data;
};

const getTour = async (id) => {
	const response = await axios.get(`${base_url}tours/${id}`);
	return response.data;
};

const deleteTour = async (id) => {
	const response = await axios.delete(`${base_url}tours/${id}`, {
		withCredentials: true,
	});

	return response.data;
};

const tourService = {
	getTours,
	createTour,
	updateTour,
	getTour,
	deleteTour,
};

export default tourService;
