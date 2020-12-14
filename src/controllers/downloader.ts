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

const AddSingleDownloadToAria = (req: Request, res: Response, next: NextFunction) => {
	const url = req.query.url || "";
	console.log(url);
	exec(`aria2p add ${url}`, (err, stdout, stderr) => {
		if (err) {
			console.log(`error: ${err.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
};

export default { StandAlone };
