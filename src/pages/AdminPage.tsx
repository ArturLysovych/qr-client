import { Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import { IRequest } from '../interfaces';
import { allowRequest, denyRequest, getRequests } from '../utils';

const AdminPage: React.FC = (): JSX.Element => {

	const location = useLocation();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [requests, setRequests] = useState<IRequest[]>([]);
	const [pendingRequests, setPendingRequests] = useState<IRequest[]>([]);
	const [dataFetched, setDataFetched] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (isLoading) {
			fetchData();
		}
	}, [isLoading, dataFetched]);

	const fetchData = async () => {
		setIsLoading(true);
		await getRequests().then((data) => {
			setRequests(data.sort((a: IRequest, b: IRequest) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
			setPendingRequests(data.filter((item: IRequest) => item.status === "pending"));
		}).finally(() => setDataFetched(true))
		setIsLoading(false);
	};

	return (
		<div className="w-full max-h-[800px] h-screen flex justify-center items-center bg-red-500">
			<h2 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute mt-16 top-0 py-[20px]">Admin page</h2>
			<div className="max-w-screen-lg w-full h-full flex flex-col justify-around items-center px-[10px] relative">

				<Link to='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 absolute p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</Link>

				<div className="text-[50px] text-transparent select-none">
					empty
				</div>

				<div className='flex gap-[20px] text-xl text-white absolute top-[170px] right-4'>
					<Link to='requests' className={`${location.pathname === '/admin/requests' && "font-bold"} cursor-pointer transition-all duration-100 relative`}>Requests
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-[-2px] right-[-12px] rounded-full'>{pendingRequests.length}</span>
					</Link>
					<Link to="history" className={`${location.pathname === '/admin/history' && "font-bold"} cursor-pointer transition-all duration-100`}>History</Link>
				</div>

				<Routes>
					<Route path="/requests" element={
						<div className="w-full flex flex-col justify-start gap-[20px] h-[400px] pr-2 overflow-y-auto">
							{pendingRequests && pendingRequests.length !== 0 ?
								pendingRequests.map((item, index) => (
									<RequestItem key={index + item._id} req={item} setIsLoading={setIsLoading} />
								))
								: <h2 className='text-3xl text-white font-bold text-center'>There are no requests so far</h2>
							}
						</div>
					} />
					<Route path="history" element={
						<div className="w-full flex flex-col justify-start gap-[20px] h-[400px] pr-2 overflow-y-auto">
							{requests && requests.length !== 0 ?
								requests.map((item, index) => (
									<RequestItem key={index + item._id} req={item} changeable={true} />
								))
								: <h2 className='text-3xl text-white font-bold text-center'>There are no requests so far</h2>
							}
						</div>
					} />
				</Routes>
			</div>


			{/* load screen */}

			{isLoading &&
				<div className='fixed flex justify-center items-center bg-black-opacity-40 inset-0'>
					<img src="/src/assets/images/loader.svg" alt="loader" className='h-32 w-32' />
				</div>
			}


			{/* load screen */}

		</div>
	)
}

const RequestItem = ({ req, changeable = false, setIsLoading }: { req: IRequest, changeable?: boolean, setIsLoading?: React.Dispatch<React.SetStateAction<boolean>> }) => {

	const handleAllow = async () => {
		if (setIsLoading) {
			setIsLoading(true);
			await allowRequest(req._id);
			setIsLoading(false);
		}
	};

	const handleDeny = async () => {
		if (setIsLoading) {
			setIsLoading(true);
			await denyRequest(req._id);
			setIsLoading(false);
		}
	};
	return (
		<div className="w-full h-[120px] bg-white rounded-xl p-6 flex flex-col justify-between items-center">
			<div className="w-full flex justify-between gap-[10px]">
				<h2 className='text-lg font-medium'>{req.userId.name + req.userId.surname}</h2>
				<h3 className='text-md text-gray-500'>
					id: {req.userId.id}
				</h3>
				<h2 className='text-lg'>{req.productId.name} <span className='font-bold text-xl text-red-500'>{req.productId.price} Points</span></h2>
				{
					changeable && <h2 className={`font-bold text-xl ${req.status === "pending" ? "text-yellow-400" : req.status === "allowed" ? "text-green-500" : "text-red-500"}`}>{req.status}</h2>
				}
				{
					changeable && <h2 className={`font-bold text-base`}>{req.updatedAt.slice(0, 10).split("-").reverse().join("/")} {req.updatedAt.slice(12, 16)}</h2>
				}
			</div>
			<div className={`${changeable && "hidden"} w-full flex justify-end gap-[10px]`}>
				<button
					className='w-[120px] h-[30px] border border-red-500 bg-red-500 hover:bg-transparent outline-none text-white hover:text-red-500 rounded-md transition-colors'
					onClick={handleAllow}
				>
					Accept
				</button>
				<button
					className='w-[120px] h-[30px] border border-red-600 bg-red-600 hover:bg-transparent outline-none text-white hover:text-red-600 rounded-md transition-colors'
					onClick={handleDeny}>
					Decline
				</button>
			</div>
		</div>
	)
}

export default AdminPage;