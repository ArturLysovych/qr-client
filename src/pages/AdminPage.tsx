import { Routes, Route, Link, useLocation } from 'react-router-dom';
import React from 'react'

import { IReq } from '../interfaces';
import { requestsArr } from '../constants';

const AdminPage: React.FC = (): JSX.Element => {

	const location = useLocation();

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
						<span className='absolute bg-red-900 h-[18px] w-[18px] text-[10px] flex items-center justify-center top-0 right-[-12px] rounded-full'>{requestsArr.length}</span>
					</Link>
					<Link to="history" className={`${location.pathname === '/admin/history' && "font-bold"} cursor-pointer transition-all duration-100`}>History</Link>
				</div>

				<Routes>
					<Route path="/requests" element={
						<div className="w-full flex flex-wrap justify-center items-start gap-[20px] h-[400px] pr-2 overflow-y-scroll">
							{requestsArr.map((item, index) => (
								<RequestItem key={index} req={item} />
							))}
						</div>
					} />
					<Route path="history" element={
						<div className="w-full h-[400px] flex items-start justify-center">
							<h2 className='text-3xl text-white font-bold'>History is empty</h2>
						</div>
					} />
				</Routes>
			</div>
		</div>
	)
}

const RequestItem = ({ req }: { req: IReq }) => (
	<div className="w-full h-[120px] bg-white rounded-xl p-6 flex flex-col justify-between items-center">
		<div className="w-full flex justify-between gap-[10px]">
			<h2 className='text-lg font-medium'>{req.user}</h2>
			<h3 className='text-md text-gray-500'>
				id: {req.id}
			</h3>
			<h2 className='text-lg'>{req.goodInfo.title} <span className='font-bold text-xl text-red-500'>{req.goodInfo.price} Coins</span></h2>
		</div>
		<div className="w-full flex justify-end gap-[10px]">
			<button className='w-[120px] h-[30px] bg-red-500 outline-none text-white rounded-md'>Accept</button>
			<button className='w-[120px] h-[30px] bg-red-600 outline-none text-white rounded-md'>Decline</button>
		</div>
	</div>
)

export default AdminPage;