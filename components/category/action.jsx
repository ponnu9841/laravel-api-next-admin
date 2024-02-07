import Popper from "@mui/material/Popper";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
	Button,
	ClickAwayListener,
	Divider,
	Grow,
	MenuItem,
	MenuList,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";

export default function Action(props) {
	const { id, setSelectedUserId } = props;

	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const handleMenuItemClick = (event) => {
		setOpen(false);
		if (id) {
			setSelectedUserId(id);
		}
	};

	return (
		<div>
			<Button
				size="small"
				aria-controls={open ? "split-button-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-label="select merge strategy"
				aria-haspopup="menu"
				onClick={handleToggle}
				ref={anchorRef}
			>
				<ArrowDropDownIcon />
			</Button>

			<Popper
				sx={{
					zIndex: 1,
				}}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom" ? "center top" : "center bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									id="split-button-menu"
									autoFocusItem
									className="min-w-[150px] shadow-md"
								>
									<MenuItem onClick={(event) => handleMenuItemClick(event)}>
										Edit
									</MenuItem>
									<MenuItem onClick={(event) => handleMenuItemClick(event)}>
										Delete
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}
