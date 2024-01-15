import axios from "axios";

export const createUser = async (id: string): Promise<any> => {
	const res = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/users`, { id: id })
	return res.data;
}

export const addScan = async (id: string): Promise<any> => {
	const res = await axios.put(`${import.meta.env.VITE_APP_SERVER_URL}/users/${id}`, { date: new Date() })
	return res.data;
}

export const getScansValue = async (): Promise<string[]> => {
	const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/users/scans`)
	return res.data.toString().split("")
}

export const fetchData = async () => {
	const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/users`);
	const sortedData = response.data.sort((a: IUser, b: IUser) => b.timesScanned - a.timesScanned);
	return sortedData;
}