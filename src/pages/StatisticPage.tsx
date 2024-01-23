import HistoryTable from "../components/HIstoryTable"

const StatisticPage = () => {

	return (
		<div className="bg-red-500">
			<div className="container mx-auto px-[20px] max-w-screen-lg">
				<div className="min-h-screen flex flex-col justify-center items-center py-16 gap-10 text-white font-bold">
					<HistoryTable />
				</div>
			</div>
		</div>
	)
}

export default StatisticPage