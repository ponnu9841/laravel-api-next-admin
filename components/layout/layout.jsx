import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { sidebar } from "./sidebar-const";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "@/axios/axios-client";
import { useRouter } from "next/router";
import { profieDetails } from "@/redux/action/action";
import UserInfo from "./partials/userInfo";
import Link from "next/link";

const drawerWidth = 240;

export default function Layout(props) {
	const { window, children } = props;

	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};
	const router = useRouter();
	const dispatch = useDispatch();

	const profileData = useSelector((state) => state.getProfileData);

	React.useEffect(() => {
		if (!profileData) {
			axiosClient
				.get("/user")
				.then((response) => {
					// console.log(response);
					if (response.status == 401) {
						//unauthorized
						router.push("/");
					}
					if (response.status == 200) {
						if (response.data.status) {
							const profileData = {
								email: response.data.email,
								name: response.data.name,
								role: response.data.role,
							};
							dispatch(profieDetails({ profileData }));
						}
					} else {
						// router.push("/");
					}
				})
				.catch((error) => {
					router.push("/");
				});
		}
	}, []);

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{sidebar.map((item, index) => (
					<Link
						href={item?.link || "#"}
						className="text-slate-700 no-underline"
						key={index}
					>
						<ListItem key={index} disablePadding>
							<ListItemButton>
								<ListItemIcon>{item?.icon}</ListItemIcon>
								<ListItemText primary={item?.text} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	);

	// Remove this const when copying and pasting into your project.
	const container =
		window !== undefined ? () => window().document.body : undefined;

	if (profileData) {
		return (
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						{/* <Typography variant="h6" noWrap component="div">
							Responsive drawer
						</Typography> */}
						<div className="flex w-full px-3 justify-between items-center">
							Dashboard
							<UserInfo />
						</div>
					</Toolbar>
				</AppBar>
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onTransitionEnd={handleDrawerTransitionEnd}
						onClose={handleDrawerClose}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
					}}
				>
					<Toolbar />
					{children}
				</Box>
			</Box>
		);
	}
}
