import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { addCredentials, addScan, getUser } from "../utils";
import { useMyContext } from "../providers/ContextProvider";

const RedirectPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { message, setMessage } = useMyContext();

	useEffect(() => {
		let isCancelled = false;

		const fetchData = async () => {
			if (id) {
				const data = await getUser(id);
				if (!isCancelled) {
					if (data && data.name && data.surname) {
						const scanData = await addScan(id);
						if (!isCancelled && scanData.res) {
							setMessage(scanData.res);
							navigate("/");
						}
					} else {
						const status = await getCredentials(id);
						if (!isCancelled) {
							if (status) {
								const scanData = await addScan(id);
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
			} else {
				navigate("/");
			}
		};

		fetchData();

		return () => {
			isCancelled = true;
		};
	}, [id]);

	const getCredentials = async (id: string) => {
		const name = prompt("Enter your name")
		const surname = prompt("Enter your surname")
		if (!name || !surname) {
			setMessage("You have to enter your name and surname to get a point");
			return false;
		}
		const credentials = { name, surname }
		const userData = await addCredentials(id, credentials);
		handleScan(id)
		return userData
	}

	const handleScan = async (id: string) => {
		await addScan(id)
			.then((data) => {
				console.log(data.res)
				if (data.res) {
					if (message === null) {
						setMessage(data.res);
					}
				}
			})
	}

	return (
		<div className="bg-[#FF7D06]">
			<div className="container mx-auto px-4">
				<div className="min-h-screen flex justify-center items-center">
					<h1 className="text-[32px] md:text-[48px] xl:text-[56px] 2xl:text-[64px] text-white  font-bold text-center leading-[110%]">Processing your data...</h1>
				</div>
			</div>
		</div>
	)
}

export default RedirectPage