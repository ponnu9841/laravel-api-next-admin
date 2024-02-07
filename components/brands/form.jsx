import axiosClient from "@/axios/axios-client";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React from "react";
import slugify from "slugify";

export default function Form(props) {
	const { title, id } = props;

	const [formValues, setFormValues] = React.useState({
		name: "",
		isActive: "1",
	});

	const slug = slugify(formValues?.name || " ", { lower: true });

	const handleInputChange = (e) => {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	function handleFormSubmit(e) {
		e.preventDefault();
		const payload = {
			id: id,
			name: formValues?.name,
			slug: slug,
			status: formValues?.isActive,
		};
		if (id) {
			// edit brand api
		} else {
			// add brand
			axiosClient.post("/brand/create", payload).then((response) => {
				props?.getBrands();
			});
		}
	}

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div className="text-lg mb-3">{title || "Add Brand"}</div>
				<input type="hidden" value={id || ""} />
				<TextField
					id="outlined-basic"
					label="Name"
					variant="outlined"
					placeholder="Name"
					className="w-full mb-4"
					value={formValues?.name}
					onChange={handleInputChange}
					name="name"
				/>
				<TextField
					id="outlined-basic"
					label="Slug"
					variant="outlined"
					className="w-full mb-4"
					disabled
					value={slug}
				/>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Status</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={formValues?.isActive}
						label="Active"
						onChange={handleInputChange}
						name="isActive"
					>
						<MenuItem value={"1"}>Active</MenuItem>
						<MenuItem value={"0"}>InActive</MenuItem>
					</Select>
				</FormControl>
				<Button variant="contained" type="submit" className="mt-4" size="large">
					Submit
				</Button>
			</form>
		</div>
	);
}
