import Category from "@/components/category/category";
import Layout from "@/components/layout/layout";
import React from "react";

export default function Categories() {
	return <Category />;
}

Categories.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
