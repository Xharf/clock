import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import moment from "moment/moment";

export default function CurrentTime() {
	const [now, setNow] = useState(null);

	useEffect(() => {
		setNow(moment().format("HH:mm:ss.S"));
		setInterval(() => {
			setNow(moment().format("HH:mm:ss.S"));
		}, 100);
	}, []);

	return (
		<>
			<Typography variant="h3" component="h1" align="center" marginTop={2}>
				{now}
			</Typography>
			<Typography variant="subtitle2" align="center" color="gray">
				Saat ini: {moment().format("DD/MM/YYYY")}
			</Typography>
		</>
	);
}
