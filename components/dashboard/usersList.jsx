import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Action from "../category/action";

export default function UsersList(props) {
	// console.log(data);
	const { data, setSelectedUserId } = props;
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className="max-w-[50px]">ID</TableCell>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Email</TableCell>
						<TableCell align="left">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.data?.map((item, index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row" className="max-w-[50px]">
								{item?.id}
							</TableCell>
							<TableCell align="left">{item?.name}</TableCell>
							<TableCell align="left">{item?.email}</TableCell>
							<TableCell align="left">
								<Action id={item?.id} setSelectedUserId={setSelectedUserId} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
