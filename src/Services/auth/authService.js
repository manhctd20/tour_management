import axios from "axios";
import { base_url } from "../../Services/BaseService";
const login = async (user) => {
	const response = await axios.post(`${base_url}auth/login`, user, {
		withCredentials: true,
	});
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const getAllUser = async () => {
	const response = await axios.get(`${base_url}users`, {
		withCredentials: true,
	});
	return response.data;
};

const deleteUser = async (id) => {
	const response = await axios.delete(`${base_url}users/${id}`, {
		withCredentials: true,
	});
	return response.data;
};

const authService = {
	login,
	getAllUser,
	deleteUser,
};

export default authService;
