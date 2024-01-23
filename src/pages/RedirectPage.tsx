import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { addCredentials, addScan, getUser } from "../utils";
import { useMyContext } from "../providers/ContextProvider";
import Cookies from 'js-cookie';

const RedirectPage = () => {
	const { id } = useParams<{ id: string }>();
	const initialRender = useRef<boolean>(true);
	const navigate = useNavigate();

	const { message, setMessage } = useMyContext();

	useEffect(() => {

		const fetchData = async () => {
			if (id && initialRender.current) {
				initialRender.current = false;
				try {
					const data = await getUser(id)
					Cookies.set('qr_unique_user_id', id, { expires: 1200 });
					if (data && data.name && data.surname) {
						await handleScan(id);
						return;
					} else {
						const status = await getCredentials(id);
						if (status) {
							await handleScan(id);
							return;
						} else {
							if (data && (!data?.name && !data?.surname)) {
								setMessage("You have to enter valid name and surname to get a point");
							}
							navigate("/");
							return;
						}
					}
				} catch (error: any) {
					setMessage(error.message);
					navigate("/");
					return;
				}
			} else {
				navigate("/");
				return;
			}
		};

		fetchData();
	}, [id]);

	const getCredentials = async (id: string) => {
		const userDetails = prompt("Enter your name and surname")?.trim().split(" ");
		if (userDetails?.length !== 2) {
			setMessage("You have to enter valid name and surname to get a point");
			return false;
		}
		const credentials = { name: userDetails[0], surname: userDetails[1] };
		const userData = await addCredentials(id, credentials);
		return userData;
	}

	const handleScan = async (id: string): Promise<any> => {
		try {
			const data = await addScan(id);
			if (data?.message && message === null) {
				setMessage(data.message);
			}
			navigate("/");
			return data;
		} catch (err) {
			setMessage("You have already scanned today");
			navigate("/");
			return err;
		}
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