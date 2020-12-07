import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Sample Controllers";

const updateItemList = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Item list update route called.`);

	return res.status(200).json({
		message: "pong"
	});
};

const fetchItemList = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Item list fetch route called.`);
	const id = req.query.id || -1;
	console.log(id);

	return res.status(200).json({
		message: id == -1 ? "item not found" : "item found"
	});
};

export default { updateItemList, fetchItemList };
