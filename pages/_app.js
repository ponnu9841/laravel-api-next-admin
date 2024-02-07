import * as React from "react";

import PropTypes from "prop-types";
import Head from "next/head";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";
import "@/styles/globals.css";

//redux
import { Provider } from "react-redux";
import store from "@/redux/store";
import GlobalState from "@/globalState/globalState";

export default function MyApp(props) {
	const { Component, pageProps } = props;

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<Provider store={store}>
			<AppCacheProvider {...props}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<GlobalState />

					{getLayout(<Component {...pageProps} />)}
				</ThemeProvider>
			</AppCacheProvider>
		</Provider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
