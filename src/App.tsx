import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import axios from 'axios';
import QRCode from 'qrcode.react';

import LeadersTable from "./components/LeadersTable";

function App() {
	const [size, setSize] = useState(310);

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(result => {
				createUser(result.visitorId);
			})
	}, [])

	useEffect(() => {
		const handleResize = () => {
			setSize(window.innerWidth >= 1024 ? 500 : 310);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const createUser = async (id: string) => {
		const response = await axios.post('http://localhost:5000/users', { id: id })
		console.log(response)
	}

	return (
		<div className="bg-[#FF7D06]">
			<div className="container mx-auto px-4">
				<div className="min-h-screen flex flex-col items-center py-16 gap-20 text-white font-bold">

					<h1 className="text-[75px] font-bold text-center leading-[110%]">ScPoints Farmer</h1>

					<div className="flex gap-20 flex-col w-full items-center mt-10 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex flex-col justify-center items-center gap-2">
							<h3 className="text-[31px] text-center max-w-[225px]">Scan this code to get a point</h3>
							<div className="h-[310px] lg:h-[500px] w-[310px] lg:w-[500px] bg-black rounded-xl">
								<QRCode size={Math.min(size, window.innerWidth, window.innerHeight)} value="/" />
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<div className="gap-3 flex justify-between">
								{[1, 2, 3].map((item, index) => (
									<div key={`${index}-${item}`} className="text-[72px] h-[90px] w-[90px] bg-[#A55205] flex justify-center items-center rounded-xl">
										<p>{item}</p>
									</div>
								))}
							</div>
							<h4 className="text-[52px] text-center">You ScPoints</h4>
						</div>
					</div>

					<div className="w-full flex justify-center">
						<LeadersTable />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
