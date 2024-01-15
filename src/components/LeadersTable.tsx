import axios from "axios"
import { useEffect, useState } from "react"
import { useMyContext } from "../providers/ContextProvider"

const LeadersTable = () => {
	const [data, setData] = useState<IUser[]>([])
	const { id } = useMyContext()

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await axios.get('http://localhost:5000/users');
		const sortedData = response.data.sort((a: IUser, b: IUser) => b.timesScanned - a.timesScanned);
		setData(sortedData);
	}

	return (
		<div className='rounded-xl bg-orange-500 w-full py-5 px-3 flex gap-4 flex-col items-center'>
			<h2 className="text-[34px]">Top Users</h2>
			<table className="w-full">
				<tbody className="flex flex-col gap-2">
					{data.map((item, index) => (
						<tr key={item.id} className={`w-full ${id === item.id ? "bg-orange-800" : "bg-orange-300"} flex justify-between text-2xl py-3 px-4 rounded-xl`}>
							<td>{index + 1}</td>
							<td>id: {item.id}</td>
							<td>scans: {item.timesScanned}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default LeadersTable