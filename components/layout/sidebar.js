import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
import { sidebar } from "./sidebar-const";

export default function Sidebar() {
	return (
		<>
			<Divider />
			<List>
				{sidebar.map((item, index) => (
					<>
						<ListItem key={index} disablePadding>
							<ListItemButton>
								<ListItemIcon>{item?.icon}</ListItemIcon>
								<ListItemText primary={item?.text} />
							</ListItemButton>
						</ListItem>
					</>
				))}
			</List>
		</>
	);
}
