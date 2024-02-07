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
			category: selectedCategory,
		};
		if (id) {
			// edit brand api
		} else {
			// add brand
			axiosClient.post("/sub-category/create", payload).then((response) => {
				if (response.status == 200) {
					if (response.data.status) {
						props?.getBrands();
					}
				}
			});
		}
	}

	const [categories, setCategories] = React.useState(null);

	React.useEffect(() => {
		axiosClient.get("category/getAllCategories").then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					setCategories(response.data.data);
					setSelectedCategory(response.data.data[0]?.id);
				}
			}
		});
	}, []);

	// console.log(categories);

	const [selectedCategory, setSelectedCategory] = React.useState("");

	const handleChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<div className="text-lg mb-3">{title || "Add Sub Category"}</div>
				<input type="hidden" value={id || ""} />

				<FormControl fullWidth className="mb-4">
					<InputLabel id="demo-simple-select-label">Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={selectedCategory}
						label="Category"
						onChange={handleChange}
					>
						{categories?.map((item) => (
							<MenuItem value={item?.id} key={item?.id}>
								{item?.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

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

				<Button variant="contained" type="submit" className="mt-4" size="large">
					Submit
				</Button>
			</form>
		</div>
	);
}
