import axiosClient from "@/axios/axios-client";
import React from "react";
import UsersList from "./usersList";
import Paginator from "../pagination/pagination";
import ProfileManage from "./profile-manage";

export default function DashboardComponent() {
	const [users, setUsers] = React.useState(null);
	const [categories, setCategories] = React.useState(null);
	const [subCategories, getSubCategories] = React.useState(null);
	const [selectedUserId, setSelectedUserId] = React.useState(null);

	const pageSize = 7;
	const [pageNo, setPageNo] = React.useState(1);

	React.useEffect(() => {
		getUsers(1);

		axiosClient.get("/category/getAllCategories").then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					setCategories(response.data.data);
				}
			}
		});

		axiosClient.get("/sub-category/getAllSubCategories").then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					getSubCategories(response.data.data);
				}
			}
		});
	}, []);

	function getUsers(pageNo) {
		let url = "/getUsers?pageSize=" + pageSize;
		if (pageNo && pageNo > 1) {
			url += "&page=" + pageNo;
		}
		axiosClient.get(url).then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					setUsers(response.data.data);
					if (!selectedUserId) {
						setSelectedUserId(response.data.data.data[0]?.id);
					}
				}
			}
		});
	}

	return (
		<div className="md:flex md:space-x-8">
			<div className="flex-1">
				<h4>Users List</h4>
				<UsersList data={users} setSelectedUserId={setSelectedUserId} />
				<div className="my-2"></div>
				<Paginator
					page={pageNo}
					setPage={setPageNo}
					getList={getUsers}
					data={users}
				/>
			</div>
			<div className="flex-1">
				<ProfileManage
					categories={categories}
					subCategories={subCategories}
					selectedUserId={selectedUserId}
				/>
			</div>
		</div>
	);
}
