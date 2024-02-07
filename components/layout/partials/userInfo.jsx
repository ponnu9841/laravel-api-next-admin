import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HttpsIcon from "@mui/icons-material/Https";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import axiosClient from "@/axios/axios-client";
import { useRouter } from "next/router";
import { logOut } from "@/redux/action/action";

export default function UserInfo() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const router = useRouter();
	const dispatch = useDispatch();

	const profileData = useSelector((state) => state.getProfileData);

	function logout(e) {
		e.preventDefault();
		axiosClient.delete("/logout").then((response) => {
			if (response.status == 200) {
				if (response.data.status) {
					localStorage.removeItem("token");
					dispatch(logOut());
					router.push("/");
				}
			}
		});
	}

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem>
					<div className="flex flex-col w-full p-4 min-w-[200px]">
						<div className="pb-4 pt-3">
							<div className="text-2xl font-semibold leading-4">
								{profileData?.name}
							</div>
							<div className="text-sm">{profileData?.email}</div>
						</div>

						<Divider />
						<Link
							href="/"
							className="py-3 flex space-x-3 items-center no-underline text-slate-900"
						>
							<SettingsIcon />
							<span>Settings</span>
						</Link>

						<Divider />
						<Link
							href="/"
							className="py-3 flex space-x-3 items-center no-underline text-slate-900"
						>
							<HttpsIcon />
							<span>Change Password</span>
						</Link>

						<Divider />
						<Button
							variant="text"
							className="py-3 flex space-x-3 items-center no-underline text-red-600 justify-start"
							onClick={logout}
						>
							<LogoutIcon />
							<span>Logout</span>
						</Button>
					</div>
				</MenuItem>
			</Menu>
		</div>
	);
}
