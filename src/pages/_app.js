import { Container, Grid } from "@mui/material";
import "../styles/global.css";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Link from "next/link";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Container maxWidth="xs">
				<Grid
					container
					sx={{ textAlign: "center" }}
					justifyContent="center"
					paddingTop={2}
					paddingBottom={2}
				>
					<Grid item xs={2}>
						<Link href="/alarm" style={{ color: "gray" }}>
							<AccessAlarmIcon></AccessAlarmIcon>
						</Link>
					</Grid>
					<Grid item xs={2}>
						<Link href="/" style={{ color: "gray" }}>
							<AccessAlarmsIcon></AccessAlarmsIcon>
						</Link>
					</Grid>
					<Grid item xs={2}>
						<Link href="/stopwatch" style={{ color: "gray" }}>
							<TimerOutlinedIcon></TimerOutlinedIcon>
						</Link>
					</Grid>
					<Grid item xs={2}>
						<Link href="/countdown" style={{ color: "gray" }}>
							<HourglassEmptyIcon></HourglassEmptyIcon>
						</Link>
					</Grid>
				</Grid>
				<Component {...pageProps} />
			</Container>
		</>
	);
}
