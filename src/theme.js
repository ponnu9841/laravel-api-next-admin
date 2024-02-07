import { Nunito } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const font = Nunito({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		fontFamily: font.style.fontFamily,
	},
});

export default theme;
