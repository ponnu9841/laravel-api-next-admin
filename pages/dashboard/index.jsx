import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Layout from "@/components/layout/layout";
import DashboardComponent from "@/components/dashboard/dashboard";

export default function Dashboard() {
	return <DashboardComponent />;
}

Dashboard.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
