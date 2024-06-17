import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
	Icon,
	Fab,
	Fade,
	Dialog,
	DialogContent,
	Toolbar,
	IconButton,
	Typography,
	Grid,
	Box,
} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import pubsub from "pubsub-js";
import { useRequest, useResponsive, useKeyPress } from "ahooks";
import { updateSetting } from "../../redux/actions/player";
import { getSongUrl, getSongLyric } from "../../api";
import AudioPlayer from "../../components/AudioPlayer";
import Lyric from "../../components/Lyric";

const PlayerDialog = ({ songs, current, src, updateSetting, lyric, mode }) => {
	const { md } = useResponsive();

	const [playerDialog, setPlayerDialog] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);

	const togglePlayerDialog = (open) => {
		setPlayerDialog(open);
	};

	const { runAsync: runGetSongUrl, refreshAsync: refreshGetSongUrl } =
		useRequest(() => getSongUrl(songs[current].id), { manual: true });

	const { runAsync: runGetSongLyric, refreshAsync: refreshGetSongLyric } =
		useRequest(() => getSongLyric(songs[current].id), { manual: true });

	const fetchSongData = useCallback(async () => {
		const { data: songUrl } = await runGetSongUrl();
		const { lrc } = await runGetSongLyric();
		if (songUrl[0].url && lrc) {
			updateSetting({ src: songUrl[0]?.url, lyric: lrc.lyric });
		} else {
			changeSong(current + 1);
		}
	}, [current, runGetSongUrl, runGetSongLyric, updateSetting]);

	useEffect(() => {
		const subscription = pubsub.subscribe("CURRENT_TIME", (msg, data) => {
			setCurrentTime(data);
			updateSetting({ currentTime: data });
		});

		fetchSongData();

		return () => {
			pubsub.unsubscribe(subscription);
		};
	}, [fetchSongData]);

	useEffect(() => {
		fetchSongData();
	}, [songs, current, fetchSongData]);

	useKeyPress("shift.a", () => {
		setPlayerDialog((prev) => !prev);
	});

	const changeSong = (index) => {
		const songsCount = songs.length - 1;
		if (index === -1) {
			updateSetting({ current: songsCount });
		} else if (index > songsCount) {
			updateSetting({ current: 0 });
		} else {
			updateSetting({ current: index });
		}
	};

	const toggleMode = () => {
		const modes = ["order", "random", "repeat"];
		const currentModeIndex = modes.indexOf(mode);
		const newMode = modes[(currentModeIndex + 1) % modes.length];
		updateSetting({ mode: newMode });
	};

	const fabStyle = {
		position: "fixed",
		bottom: 16,
		right: 16,
	};

	return (
		<>
			<Fab
				color="primary"
				onClick={() => togglePlayerDialog(true)}
				sx={fabStyle}
				variant={md ? "extended" : "circular"}
			>
				{/* <Icon>headphones</Icon> */}
				<AudiotrackIcon />
				{md && (
					<Typography variant="body2" sx={{ ml: 1 }}>
						{`正在播放：${songs[current]?.name.substr(0, 8)}...`}
					</Typography>
				)}
			</Fab>
			<Dialog
				fullScreen
				scroll="paper"
				keepMounted
				open={playerDialog}
				onClose={() => togglePlayerDialog(false)}
				TransitionComponent={Fade}
				sx={{
					overflowY: "hidden",
					backgroundColor: "transparent",
				}}
			>
				<DialogContent
					sx={{
						p: 0,
						m: 0,
						width: "100%",
						height: "100vh",
						backgroundColor: "transparent",
						overflow: "hidden",
						position: "relative",
					}}
				>
					<Box
						sx={{
							width: "100%",
							height: "100%",
							position: "absolute",
							left: 0,
							top: 0,
							backgroundImage: `url(${songs[current]?.al.picUrl})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							filter: "blur(60px) brightness(80%)",
							transform: "scale(1.2)",
							transition: "background 0.5s ease 0.5s",
						}}
					></Box>
					<Box
						sx={{
							width: "100%",
							height: "100%",
							color: "white",
							zIndex: 1,
							position: "relative",
							overflow: "hidden",
						}}
					>
						<Toolbar sx={{}}>
							<Box sx={{ width: "100%" }} />
							<IconButton
								color="inherit"
								onClick={() => togglePlayerDialog(false)}
							>
								<Icon>close</Icon>
							</IconButton>
						</Toolbar>
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								xs={12}
								sm={6}
								item
								container
								justifyContent="center"
								alignItems="center"
							>
								<AudioPlayer
									src={src}
									currentSong={songs[current]}
									changeSong={changeSong}
									current={current}
									songs={songs}
									mode={mode}
									toggleMode={toggleMode}
									setPlayerDialog={setPlayerDialog}
								/>
							</Grid>
							<Grid
								xs={12}
								sm={6}
								item
								container
								justifyContent="center"
								alignContent="center"
								sx={{ display: { xs: "none", sm: "flex" } }}
							>
								<Lyric lrc={lyric} currentTime={currentTime} />
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default connect(
	({
		player: {
			songs,
			setting: { current, src, lyric, mode },
		},
	}) => ({
		songs,
		current,
		src,
		lyric,
		mode,
	}),
	{
		updateSetting,
	}
)(PlayerDialog);
