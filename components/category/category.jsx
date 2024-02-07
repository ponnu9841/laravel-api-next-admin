import React from "react";
import List from "./list";
import Form from "./form";
import axiosClient from "@/axios/axios-client";
import Paginator from "../pagination/pagination";

export default function Category() {
	const [data, setData] = React.useState({
		loading: true,
		data: null,
		error: null,
	});
	const pageSize = 7;
	const [pageNo, setPageNo] = React.useState(1);

	React.useEffect(() => {
		getBrands();
	}, []);

	function getBrands(pageNo) {
		let url = "/category/list?pageSize=" + pageSize;
		if (pageNo && pageNo > 1) {
			url += "&page=" + pageNo;
		}
		setData((prevState) => ({ ...prevState, loading: true }));
		axiosClient
			.get(url)
			.then((response) => {
				if (response.status == 200) {
					if (response.data.status) {
						setData((prevState) => ({
							...prevState,
							data: response.data.data,
						}));
					}
				}
			})
			.finally(() =>
				setData((prevState) => ({ ...prevState, loading: false }))
			);
	}

	console.log(data?.data);

	return (
		<div className="md:flex w-full md:space-x-8 space-y-8 md:space-y-0 pr-8">
			<div className="w-full md:w-1/2">
				{data?.data?.data?.length > 0 && <List data={data} />}
				<div className="my-2"></div>
				{data?.data?.data?.length > 0 && (
					<Paginator
						page={pageNo}
						setPage={setPageNo}
						getList={getBrands}
						data={data?.data}
					/>
				)}
			</div>
			<div className="w-full md:w-1/2">
				<Form getBrands={getBrands} />
			</div>
		</div>
	);
}
