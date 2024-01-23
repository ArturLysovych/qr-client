import { useEffect, useRef, useState } from 'react';
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import Cookies from 'js-cookie';

import { IProduct } from '../interfaces';
import { getProducts } from '../utils';
import { createRequest } from '../utils';
import { useMyContext } from '../providers/ContextProvider';
import Loader from '../components/Loader';

const baseUlr = import.meta.env.VITE_APP_SERVER_URL;

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

const GoodItem = ({ product, userId, setIsLoading }: { product: IProduct, userId: string | null, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {

	const handleRequestSend = async (userId: string | null, productId: string) => {
		if (userId) {
			setIsLoading(true)
			const response = await createRequest(userId, productId)
				.then(() => alert("Request has been successfully send"))
				.catch((error) => alert(error.response.data.message))
				.finally(() => setIsLoading(false))
			return response;
		}
		return null;
	}

	return (
		<div
			className="h-[240px] w-[150px] bg-white flex flex-col justify-around items-center rounded-xl border-red-400 transition-all duration-300 border-[1px] cursor-pointer hover:border-[5px]"
			onClick={() => handleRequestSend(userId, product._id)}
		>

			<div className='w-full h-[130px] px-2 py-0'>
				<img src={`${baseUlr}/${product.image}`} alt="good img" className='object-cover h-full w-full' />
			</div>

			<h3 className='w-full bg-red-400 text-white text-xl flex justify-center'>{product.name}</h3>
			<h2 className='text-2xl text-red-500 font-bold'>{product.price} points</h2>
		</div>
	);
}

export default ShopPage;