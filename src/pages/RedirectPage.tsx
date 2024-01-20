import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { addCredentials, addScan, getUser } from "../utils";
import { useMyContext } from "../providers/ContextProvider";
import Cookies from 'js-cookie';

const RedirectPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { message, setMessage } = useMyContext();

	useEffect(() => {
		let isCancelled = false;

		const fetchData = async () => {
			if (id) {
				try {
					const data = await getUser(id);
					Cookies.set('qr_unique_user_id', id, { expires: 1200 });
					if (!isCancelled) {
						if (data && data.name && data.surname) {
							await handleScan(id);
						} else {
							const status = await getCredentials(id);
							if (!isCancelled) {
								if (status) {
									const scanData = await handleScan(id);
									if (!isCancelled && scanData.res) {
										setMessage(scanData.res);
									}
									navigate("/");
								} else {
									if (data && (!data?.name && !data?.surname)) {
										setMessage("You have to enter your name and surname to get a point");
									}
									navigate("/");
								}
							}
						}
					}
				} catch (error: any) {
					console.log(error);
					setMessage(error.message);
					navigate("/");
				}
			} else {
				navigate("/");
			}
		};

		fetchData();

		return () => {
			isCancelled = true;
		};
	}, []);

	const getCredentials = async (id: string) => {
		const name = prompt("Enter your name");
		const surname = prompt("Enter your surname");
		if (!name?.trim() || !surname?.trim()) {
			setMessage("You have to enter your name and surname to get a point");
			return false;
		}
		const credentials = { name: name.trim(), surname: surname.trim() };
		const userData = await addCredentials(id, credentials);
		handleScan(id);
		return userData;
	}

	const handleScan = async (id: string): Promise<any> => {
		return await addScan(id)
			.then((data) => {
				if (data?.res) {
					if (message === null) {
						setMessage(data.res);
						navigate("/");
					}
					navigate("/");
				}
			}).catch(err => {
				if (err) {
					setMessage("You have already scanned today");
					navigate("/");
				}
			})

	}

	return (
		<div className="bg-red-500">
			<div className="container mx-auto px-4">
				<div className="min-h-screen flex justify-center items-center">
					<h1 className="text-[32px] md:text-[48px] xl:text-[56px] 2xl:text-[64px] text-white font-bold text-center leading-[110%]">Processing your data...</h1>
				</div>
			</div>
		</div>
	)
}

export default RedirectPage