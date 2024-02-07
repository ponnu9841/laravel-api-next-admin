import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginator(props) {
	const { page, setPage, getList, data } = props;

	const handleChange = (event, value) => {
		setPage(value);
		if (getList) {
			getList(value);
		}
	};

	return (
		<Stack spacing={2}>
			<Pagination count={data?.last_page} page={page} onChange={handleChange} />
		</Stack>
	);
}
