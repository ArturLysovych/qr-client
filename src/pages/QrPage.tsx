import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import QRCode from 'qrcode.react';

import LeadersTable from "../components/LeadersTable";
import { createUser, getScansValue } from "../utils";
import { useMyContext } from "../providers/ContextProvider";

function QrPage() {
	const [size, setSize] = useState<number>(310);
	const [scans, setScans] = useState<string[]>([]);
	const { message, setMessage, id, setId } = useMyContext();

	useEffect(() => {
		if (message !== null) {
			setTimeout(() => {
				alert(message);
				setMessage(null);
			}, 200)
		}
	}, [message]);

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(result => {
				createUser(result.visitorId);
				setId(result.visitorId);
			})
		getScansValue().then(data => setScans(data));
	}, [])

	useEffect(() => {
		const handleResize = () => {
			setSize(window.innerWidth >= 1024 ? 430 : 240);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className="bg-[#FF7D06]">
			<div className="container mx-auto px-4">
				<div className="min-h-screen flex flex-col items-center py-16 gap-20 text-white font-bold">

					<h1 className="text-[75px] font-bold text-center leading-[110%]">ScPoints Farmer</h1>

					<div className="flex gap-20 flex-col w-full items-center mt-10 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex flex-col justify-center items-center gap-2">
							<h3 className="text-[31px] text-center max-w-[225px]">Scan this code to get a point</h3>
							<div className="h-[310px] lg:h-[500px] w-[310px] lg:w-[500px] bg-white rounded-xl flex justify-center items-center border-[4px] border-black">
								<QRCode
									size={Math.min(size, window.innerWidth, window.innerHeight)}
									value={`${window.location.origin}/user/${id}`}
									bgColor="#fff"
									fgColor="#FF7D06"
								/>
							</div>
							<p className="text-[18px]">id: {id}</p>
						</div>

						<div className="flex flex-col gap-5">
							<div className="gap-3 flex justify-center">
								{scans.map((item, index) => (
									<div key={`${index}-${item}`} className="text-[72px] xl:text-[110px] h-[90px] xl:h-[140px] w-[90px] xl:w-[140px] bg-[#A55205] flex justify-center items-center rounded-xl">
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

export default QrPage
