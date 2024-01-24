import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Cookies from 'js-cookie';
import { GoodItem } from '../components/GoodItem';

import { IProduct } from '../interfaces';
import { getProducts } from '../utils';
import { useMyContext } from '../providers/ContextProvider';
import Loader from '../components/Loader';


const ShopPage: React.FC = (): JSX.Element => {

	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const initialRender = useRef<boolean>(true);

	const { id, setId } = useMyContext();

	useEffect(() => {
		if (!id) {
			FingerprintJS.load()
				.then(fp => fp.get())
				.then(result => {
					const existingCookie = Cookies.get('qr_unique_user_id');
					if (!existingCookie) {
						setId(result.visitorId);
					} else {
						setId(existingCookie);
					}
				})
		}
	}, [id])

	useEffect(() => {
		if (initialRender) {
			initialRender.current = false;
			fetchData();
		}
	}, []);

	useEffect(() => {
		if (isLoading) {
			setTimeout(() => {
				fetchData();
			}, 100)
		}
	}, [isLoading]);

	const fetchData = async () => {
		setIsLoading(true);
		await getProducts().then(data => setProducts(data))
		setIsLoading(false);
	}

	return (
		<div className="w-full max-h-[800px] h-screen flex justify-center items-center bg-red-500">
			<h2 className="text-[50px] font-bold text-center leading-[110%] w-full bg-white text-red-500 absolute mt-16 top-0 py-[20px]">Shop</h2>
			<div className="max-w-screen-lg w-full h-full flex flex-col justify-around items-center px-[10px] relative">

				<a href='/' className="outline-none text-[14px] font-bold text-center leading-[110%] bg-white text-red-500 absolute p-2 rounded-xl m-4 top-0 left-0 cursor-pointer"> Back to QR-page</a>

				<div className="text-[50px] text-transparent select-none">
					empty
				</div>

				<div className="flex flex-wrap justify-center items-center gap-[10px] md:gap-[30px]">
					{products && products.length !== 0 ? products.map((item: IProduct, index: number) => (
						<GoodItem key={index} product={item} userId={id} setIsLoading={setIsLoading} />
					)) : (
						<h2 className='text-[34px] text-white font-bold'>There are no products so far</h2>
					)}
				</div>
			</div>

			{isLoading &&
				<Loader />
			}

		</div>
	)
}

export default ShopPage;