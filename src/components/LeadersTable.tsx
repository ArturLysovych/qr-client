import { useEffect, useState } from "react"

import { useMyContext } from "../providers/ContextProvider"
import { fetchData } from "../utils"

const LeadersTable = ({ isExtended = true }: { isExtended?: boolean }) => {
	const [data, setData] = useState<IUser[]>([])
	const { id, message } = useMyContext()

	useEffect(() => {
		fetchData().then(data => setData(data))
	}, [message, id])

	return (
		<div className='rounded-xl bg-orange-500 w-full py-5 px-3 flex gap-4 flex-col items-center border-[3px] border-black'>
			<h2 className="text-[34px]">Top Users</h2>
			{data.length > 0 ?

				<table className="w-full">
					<tbody className="flex flex-col gap-2">
						{data.map((item, index) => (
							item.timesScanned > 0 && (
								<tr key={item.id} className={`w-full ${id === item.id ? "bg-orange-800" : "bg-orange-300"} flex justify-between text-[8px] sm:text-[10px] md:text-lg lg:text-2xl py-3 px-4 rounded-xl`}>
									<td>{index + 1}</td>
									{
										item.name && item.surname && (
											<td>{item.name} {item.surname}</td>
										)
									}
									{
										isExtended && (
											<td>last scan: {item.lastScanned?.slice(0, 10).split("-").reverse().join("/")}</td>
										)
									}
									<td>id: {item.id}</td>
									<td>scans: {item.timesScanned}</td>
								</tr>
							)
						))}
					</tbody>
				</table>
				: <h2 className="text-[20px]">You have the chance to be the first</h2>
			}
		</div>
	)
}

export default LeadersTable