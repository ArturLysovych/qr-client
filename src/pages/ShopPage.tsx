import { useEffect, useState } from 'react';

import { IGood } from '../interfaces';
import { getProducts } from '../utils';

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

const ShopPage: React.FC = (): JSX.Element => {

	const [goods, setGoods] = useState<IGood[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getProducts();
			setGoods(data);
		}
		fetchData();
	}, []);

	return (
		<div className="w-full max-h-[800px] h-screen flex justify-center items-center bg-red-500">
			<h2 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute mt-16 top-0 py-[20px]">Shop</h2>
			<div className="max-w-screen-lg w-full h-full flex flex-col justify-around items-center px-[10px] relative">

				<a href='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 absolute p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</a>

				<div className="text-[50px] text-transparent select-none">
					empty
				</div>

				<div className="flex flex-wrap justify-center items-center gap-[10px] md:gap-[30px]">
					{goods && goods.map((item: IGood, index: number) => (
						<GoodItem key={index} good={item} />
					))}
				</div>
			</div>
		</div>
	)
}

const GoodItem = ({ good }: { good: IGood }) => {


	console.log(good);


	return (
		<div className="h-[240px] w-[150px] bg-white flex flex-col justify-around items-center rounded-xl border-red-400 transition-all duration-300 border-[1px] cursor-pointer hover:border-[5px]">

			<div className='w-full h-[130px] px-2 py-0'>
				<img src={`${baseUlr}/${good.image}`} alt="good img" className='object-cover h-full w-full' />
			</div>

			<h3 className='w-full bg-red-400 text-white text-xl flex justify-center'>{good.name}</h3>
			<h2 className='text-2xl text-red-500 font-bold'>{good.price} coins</h2>
		</div>
	);
}

export default ShopPage;