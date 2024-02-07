import Brands from "@/components/brands/brands";
import Layout from "@/components/layout/layout";
import React from "react";

export default function Brand() {
	return <Brands />;
}

Brand.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
