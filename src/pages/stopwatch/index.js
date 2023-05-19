import {
	Container,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

export default function Stopwatch() {
	const [conditions, setConditions] = useState({
		isRunning: false,
		isPaused: false,
	});
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [millisecondsPassed, setMilisecondsPassed] = useState(0);
	const intervalRef = useRef(null);
	const split = useRef([]);

	function handleStart() {
		setIsRunning(true);
		setIsPaused(false);
		setConditions({ isRunning: true, isPaused: false });

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setMilisecondsPassed((prev) => prev + 10);
		}, 10);
	}

	function handlePause() {
		setIsRunning(false);
		setIsPaused(true);
		setConditions({ isRunning: false, isPaused: true });
		clearInterval(intervalRef.current);
	}

	function handleStop() {
		setIsRunning(false);
		setIsPaused(false);
		setConditions({ isRunning: false, isPaused: false });
		clearInterval(intervalRef.current);
		setMilisecondsPassed(0);
		split.current = [];
	}

	function handleSplit() {
		split.current.push(millisecondsPassed);
	}

	return (
		<>
			<Typography
				variant="h3"
				component="h1"
				align="center"
				marginTop={2}
				marginBottom={5}
			>
				{moment
					.utc(moment.duration(millisecondsPassed).as("milliseconds"))
					.format("HH:mm:ss.S")}
			</Typography>
			{split.current
				.slice(0)
				.reverse()
				.map((time, index) => (
					<Grid
						container
						spacing={3}
						justifyContent="space-between"
						textAlign="justify"
						paddingX={2}
						key={index}
						marginBottom={2}
					>
						<Grid item xs={1}>
							<Typography>{String(index + 1).padStart(2, "0")}</Typography>
						</Grid>
						<Grid item>
							<Typography>
								+
								{time - split.current.slice(0).reverse()[index + 1]
									? moment
											.utc(
												moment
													.duration(
														time - split.current.slice(0).reverse()[index + 1],
													)
													.as("milliseconds"),
											)
											.format("mm:ss.SS")
									: moment({
											hour: 0,
											minute: 0,
											second: 0,
											millisecond: 0,
									  }).format("mm:ss.SS")}
							</Typography>
						</Grid>
						<Grid item>
							<Typography>
								{moment
									.utc(moment.duration(time).as("milliseconds"))
									.format("mm:ss.SS")}
							</Typography>
						</Grid>
					</Grid>
				))}

			<Grid
				container
				justifyContent="center"
				marginTop={3}
				spacing={2}
				marginBottom={6}
			>
				<Grid item>
					<IconButton
						aria-label="play"
						sx={{
							background: "#F7F7F7",
							color: "blue",
						}}
						style={{
							boxShadow: "5px 7px 11px 0px rgba(0,0,0,0.15)",
							webkitBoxShadow: "5px 7px 11px 0px rgba(0,0,0,0.15)",
							mozBoxShadow: "5px 7px 11px 0px rgba(0,0,0,0.15)",
						}}
						onClick={
							conditions.isPaused
								? handleStop
								: conditions.isRunning
								? handleSplit
								: handleStart
						}
					>
						{!conditions.isRunning && !conditions.isPaused && (
							<PlayArrowRoundedIcon fontSize="large" />
						)}
						{conditions.isRunning && <FlagRoundedIcon fontSize="large" />}
						{conditions.isPaused && <StopRoundedIcon fontSize="large" />}
					</IconButton>
				</Grid>
				{(conditions.isRunning || conditions.isPaused) && (
					<Grid item>
						<IconButton
							aria-label="play"
							sx={{
								background: "#F7F7F7",
								color: "blue",
							}}
							style={{
								boxShadow: "5px 7px 11px 0px rgba(0,0,0,0.15)",
								webkitBoxShadow: "5px 7px 11px 0px rgba(0,0,0,0.15)",
								mozBoxShadow: "5px 7px 11px 0px rgba(0,0,0,0.15)",
							}}
							onClick={conditions.isRunning ? handlePause : handleStart}
						>
							{conditions.isPaused && <PlayArrowRoundedIcon fontSize="large" />}
							{conditions.isRunning && <PauseRoundedIcon fontSize="large" />}
						</IconButton>
					</Grid>
				)}
			</Grid>
		</>
	);
}
