import axios from "axios";

export const createUser = async (id: string): Promise<any> => {
	const res = await axios.post('http://localhost:5000/users', { id: id })
	return res.data;
}

export const addScan = async (id: string): Promise<any> => {
	const res = await axios.put(`http://localhost:5000/users/${id}`, { date: new Date() })
	return res.data;
}

export const getScansValue = async (): Promise<string[]> => {
	const res = await axios.get(`http://localhost:5000/users/scans`)
	return res.data.toString().split("")
}