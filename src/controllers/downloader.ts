import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

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

const AddSingleDownloadToAria = (req: Request, res: Response, next: NextFunction) => {};

export default { StandAlone };