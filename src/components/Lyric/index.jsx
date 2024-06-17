import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { Lrc, useRecoverAutoScrollImmediately } from "react-lrc";

const Lyric = ({ lrc, currentTime }) => {
	const lineRenderer = useCallback(({ line: { content }, index, active }) => (
		<>
			{/* {index === 0 ? <Box sx={{ height: "50%" }}></Box> : null} */}
			<Typography
				variant={active ? "h5" : "h6"}
				component="div"
				align="center"
				// sx={{ color: active ? "inherit" : "inherit" }}
				sx={{
					opacity: active ? 1 : 0.5,
					mb: 2,
				}}
			>
				{content}
			</Typography>
		</>
	));
	/* const onCurrentLineChange = useCallback(
		({ lrcLine, index }) => console.log(index, lrcLine),
		[]
	); */
	const { signal, recoverAutoScrollImmediately } =
		useRecoverAutoScrollImmediately();

	return (
		<Box
			sx={{
				display: "flex",
				height: "85vh",
				overflowY: "scroll",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			{lrc ? (
				<>
					<Lrc
						lrc={lrc}
						currentMillisecond={currentTime * 1000}
						lineRenderer={lineRenderer}
						// onCurrentLineChange={onCurrentLineChange}
						recoverAutoScrollSingal={signal}
						recoverAutoScrollInterval={5000}
					/>
				</>
			) : (
				<Typography variant="h5" component="div" align="center">
					暂无歌词
				</Typography>
			)}
		</Box>
	);
};

export default Lyric;
