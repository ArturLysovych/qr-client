import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { addScan } from "../utils";
import { useMyContext } from "../providers/ContextProvider";

const RedirectPage = () => {
	const { id } = useParams<{ id: string }>();
	const [isMessageSet, setIsMessageSet] = useState<boolean>(false);

	const navigate = useNavigate();
	const { message, setMessage } = useMyContext();

	useEffect(() => {
		if (id) {
			addScan(id)
				.then((data) => {
					if (data.res) {
						if (!isMessageSet && message === null && message !== data.res) {
							setIsMessageSet(true);
							setMessage(data.res);
						} else {
							setMessage(null);
						}
					}
					navigate("/");
				})
		} else {
			navigate("/");
		}
	}, [id]);

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