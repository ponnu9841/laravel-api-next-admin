import { getWindowSize } from "@/redux/action/action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GlobalState() {
	const dispatch = useDispatch();

	const red = useSelector((state) => state.getProfileData);

	React.useEffect(() => {
		const windowSize = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		};
		dispatch(getWindowSize({ windowSize }));
	}, []);

	return null;
}
