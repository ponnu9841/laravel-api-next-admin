import React from "react";
import List from "./list";
import Form from "./form";
import axiosClient from "@/axios/axios-client";

export default function Brands() {
	const [brands, setBrands] = React.useState({
		loading: true,
		data: null,
		error: null,
	});

	React.useEffect(() => {
		getBrands();
	}, []);

	function getBrands() {
		axiosClient
			.get("/brand/list")
			.then((response) => {
				if (response.status == 200) {
					if (response.data.status) {
						setBrands((prevState) => ({
							...prevState,
							data: response.data.data,
						}));
					}
				}
			})
			.finally(() =>
				setBrands((prevState) => ({ ...prevState, loading: false }))
			);
	}

	console.log(brands);

	return (
		<div className="md:flex w-full md:space-x-8 space-y-8 md:space-y-0 pr-8">
			<div className="w-full md:w-1/2">
				<List brands={brands} />
			</div>
			<div className="w-full md:w-1/2">
				<Form getBrands={getBrands} />
			</div>
		</div>
	);
}
