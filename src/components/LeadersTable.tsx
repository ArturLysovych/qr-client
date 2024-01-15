import { useEffect, useState } from "react"

import { useMyContext } from "../providers/ContextProvider"
import { fetchData } from "../utils"

const LeadersTable = () => {
	const [data, setData] = useState<IUser[]>([])
	const { id } = useMyContext()

	useEffect(() => {
		fetchData().then(data => setData(data))
	}, [])

	return (
		<div className='rounded-xl bg-orange-500 w-full py-5 px-3 flex gap-4 flex-col items-center'>
			<h2 className="text-[34px]">Top Users</h2>
			<table className="w-full">
				<tbody className="flex flex-col gap-2">
					{data.map((item, index) => (
						<tr key={item.id} className={`w-full ${id === item.id ? "bg-orange-800" : "bg-orange-300"} flex justify-between text-[10px] sm:text-[12px] md:text-lg lg:text-2xl py-3 px-4 rounded-xl`}>
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