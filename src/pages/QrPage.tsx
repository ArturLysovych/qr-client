import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import QRCode from 'qrcode.react';
import Cookies from 'js-cookie';

import { createUser, getScansValue } from "../utils";
import { useMyContext } from "../providers/ContextProvider";
import LinkButton from "../components/LinkButton";
// import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

function QrPage() {
	const [size, setSize] = useState<number>(310);
	const [scans, setScans] = useState<string[]>([]);
	const { message, setMessage, id, setId } = useMyContext();

	// const { isLoading, error, data, getData } = useVisitorData(
	// 	{ extendedResult: true },
	// 	{ immediate: true }
	// )

	useEffect(() => {
		let timeoutId: any;

		if (message !== null) {
			timeoutId = setTimeout(() => {
				alert(message);
				setMessage(null)
			}, 200);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [message]);

	useEffect(() => {
		FingerprintJS.load()
			.then(fp => fp.get())
			.then(result => {
				const existingCookie = Cookies.get('qr_unique_user_id');
				if (!existingCookie) {
					Cookies.set('qr_unique_user_id', result.visitorId, { expires: 1200 });
					createUser(result.visitorId);
					setId(result.visitorId);
				} else {
					createUser(existingCookie);
					setId(existingCookie);
				}
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
		<div className="bg-red-500 relative">

			{/* <div>
				<button onClick={() => getData({ ignoreCache: true })}>
					Reload data
				</button>
				<p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
			</div> */}

			<div className="container mx-auto px-[20px] max-w-screen-lg">
				<div className="min-h-screen flex flex-col items-center py-16 gap-10 text-white font-bold">

					<h1 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute py-[20px]">ScPoints Farmer</h1>

					<div className="text-[50px] text-transparent select-none">
						empty
					</div>

					<div className="flex gap-10 flex-col w-full items-center mt-[40px] lg:flex-row lg:items-center lg:justify-between">
						<div className="flex flex-col justify-center items-center gap-2">
							<h3 className="text-[30px] text-center max-w-[225px]">Scan this code to get a point</h3>
							<div className="h-[310px] w-[310px] lg:h-[350px] lg:w-[350px] bg-white rounded-xl flex justify-center items-center border-[4px] border-gray-300">
								<QRCode
									size={Math.min(size, window.innerWidth, window.innerHeight)}
									value={`${window.location.origin}/user/${id}`}
									bgColor="#fff"
									fgColor="#ef4444"
									className="origin-center lg:scale-[.65]"
								/>
							</div>
							<p className="text-[15px] sm:text-[18px]">id: {id}</p>
						</div>

						<div className="flex flex-col gap-[50px]">
							<div className="flex flex-col gap-[10px]">
								<div className="gap-3 flex justify-center">
									{scans.map((item, index) => (
										<div key={`${index}-${item}`} className="text-[72px] xl:text-[110px] h-[90px] xl:h-[140px] w-[90px] xl:w-[140px] bg-[#a50d05] flex justify-center items-center rounded-xl">
											<p>{item}</p>
										</div>
									))}
								</div>
								<h4 className="text-[32px] text-center">Your ScPoints</h4>
							</div>
							<div className="flex justify-center mx-auto items-center w-[310px] sm:w-[340px]">
								<LinkButton to="/users">See users</LinkButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QrPage