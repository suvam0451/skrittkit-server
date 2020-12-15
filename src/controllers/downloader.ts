import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import { exec } from "child_process";

const NAMESPACE = "Downloader Controllers";
const StandAlone = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, "A single object is being downloaded");

	const url = req.query.url || "";
	console.log(url);

	return res.status(200).json({
		message: "SUCCESS",
		url: url
	});
};

const AddSingleDownloadToYoutubeDL = (req: Request, res: Response, next: NextFunction) => {
	const url = req.query.url || "";
	console.log(url);
	exec(
		`youtube-dl -x --audio-format mp3 --output /opt/music/"%(title)s.%(ext)s" ${url}`,
		(err, stdout, stderr) => {
			if (err) {
				return res.status(200).json({
					message: `error: ${err.message}`
				});
			} else if (stderr) {
				return res.status(400).json({
					message: `Please check your URL`
				});
			} else {
				return res.status(201).json({
					message: `Download completed successfully`
				});
			}
		}
	);
};

export default { StandAlone, AddSingleDownloadToYoutubeDL };
