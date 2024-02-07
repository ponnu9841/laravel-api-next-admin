import * as React from "react";
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";
import axiosClient from "@/axios/axios-client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { profieDetails } from "@/redux/action/action";

export default function Dashboard() {
	const emailRef = React.useRef(null);
	const passwordRef = React.useRef(null);

	const [passwordToggle, setPasswordToggle] = React.useState(false);

	const handleClickShowPassword = () => setPasswordToggle((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const router = useRouter();

	const [error, setError] = React.useState(null);

	const dispatch = useDispatch();

	function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		const payload = {
			email: email,
			password: password,
		};

		axiosClient
			.post("/login", payload)
			.then((response) => {
				if (response.status == 200) {
					if (response.data.status) {
						if (response.data.role !== "admin") {
							return setError("You are not authorized");
						}
						// authorized
						localStorage.setItem("token", response.data.token);
						const profileData = {
							email: response.data.email,
							name: response.data.name,
							role: response.data.role,
						};
						dispatch(profieDetails({ profileData }));
						router.push("/dashboard");
					} else {
						setError(response.data.message);
					}
				}
			})
			.catch((error) => console.log(error))
			.finally();
	}

	return (
		<div className="min-w-full min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-[500px]">
				<h5 className="text-lg lg:text-4xl text-center m-0">Login</h5>

				<div className="h-5">{error}</div>

				<form onSubmit={handleSubmit}>
					<TextField
						id="outlined-basic"
						label="Email"
						placeholder="Email Address"
						variant="outlined"
						fullWidth
						type="email"
						className="mb-4"
						inputRef={emailRef}
					/>

					<FormControl variant="outlined" fullWidth className="mb-4">
						<InputLabel htmlFor="outlined-adornment-password">
							Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={passwordToggle ? "text" : "password"}
							inputRef={passwordRef}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{passwordToggle ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>

					<Button variant="contained" type="submit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}

// Dashboard.getLayout = function getLayout(page) {
// 	return <Layout>{page}</Layout>;
// };
