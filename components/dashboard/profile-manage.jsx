import React from "react";
import { Button, TextField } from "@mui/material";
import MultipleSelectChip from "./chips";
import axiosClient from "@/axios/axios-client";
import PersonIcon from "@mui/icons-material/Person";

export default function ProfileManage(props) {
	const { categories, subCategories, selectedUserId } = props;

	const [selectedCategories, setSelectedCategories] = React.useState([]);

	const [selectedSubCategories, setSelectedSubCategories] = React.useState([]);

	const [userData, setUserData] = React.useState(null);

	React.useEffect(() => {
		axiosClient.get("/getUserbyId?id=" + selectedUserId).then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					setUserData(response?.data?.data);
					if (response.data?.data?.category_id) {
						var intArr = response.data?.data?.category_id?.map((str) => +str);
						setSelectedCategories(intArr);
					} else {
						setSelectedCategories([]);
					}
					if (response.data?.data?.sub_category_id) {
						var intArr = response.data?.data?.sub_category_id?.map(
							(str) => +str
						);
						setSelectedSubCategories(intArr);
					} else {
						setSelectedSubCategories([]);
					}
				}
			}
		});
	}, [selectedUserId]);

	function handleSubmit(e) {
		e.preventDefault();

		const payload = {
			id: selectedUserId,
			category_id: selectedCategories,
			sub_category_id: selectedSubCategories,
		};

		axiosClient.put("/updateProfileIds", payload).then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					alert("Update success");
				}
			}
		});
	}

	console.log(userData);

	return (
		<div>
			<h4>Manage Profile</h4>

			<div className="flex space-x-4 items-center py-3">
				<div className="min-w-[55px] text-center">
					{userData?.photo ? (
						<div className="aspect-square max-w-[50px] max-h-[50px]">
							<img
								className="rounded-1/2 object-contain "
								src={"http://localhost:8000/images/" + image}
								alt=""
							/>
						</div>
					) : (
						<PersonIcon className="text-3xl mx-auto" />
					)}
				</div>

				<div className="min-w-[55px]">
					<h2 className="text-xl leading-none">{userData?.name}</h2>
					<div className="text-sm">{userData?.email}</div>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<MultipleSelectChip
						data={categories}
						muliSelectData={selectedCategories}
						setMuliSelectData={setSelectedCategories}
						label="Select Categories"
					/>
				</div>

				<MultipleSelectChip
					data={subCategories}
					muliSelectData={selectedSubCategories}
					setMuliSelectData={setSelectedSubCategories}
					label="Select Sub Categories"
				/>

				<Button size="large" variant="contained" className="mt-4" type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
}
