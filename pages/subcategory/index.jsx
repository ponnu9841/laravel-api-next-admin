import Layout from "@/components/layout/layout";
import SubCategory from "@/components/subcategory/sub-category";
import React from "react";

export default function SubCategories() {
	return <SubCategory />;
}

SubCategories.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
