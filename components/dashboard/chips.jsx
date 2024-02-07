import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, muliSelectData, theme) {
	return {
		fontWeight:
			muliSelectData.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelectChip(props) {
	const theme = useTheme();

	const { muliSelectData, setMuliSelectData, data, label } = props;

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setMuliSelectData(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl fullWidth>
				<InputLabel id="demo-multiple-chip-label">
					{label || "Chips"}
				</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={muliSelectData}
					onChange={handleChange}
					input={
						<OutlinedInput id="select-multiple-chip" label={label || "Chips"} />
					}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value) => (
								<Chip
									key={value}
									label={data?.find((e) => e?.id == value)?.name}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{data?.map((item, index) => (
						<MenuItem
							key={item?.id}
							value={item?.id}
							style={getStyles(name, muliSelectData, theme)}
						>
							{item?.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
