import http from "http";
import express from "express";
import bodyParser from "body-parser";
import config from "./config/config";
import logging from "./config/logging";
import sampleRoutes from "./routes/sample";
import itemRoutes from "./routes/items";
import downloadRoute from "./routes/downloader";

const NAMESPACE = "Server";
const router = express();

router.use((req, res, next) => {
	logging.info(
		NAMESPACE,
		`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
	);

	// Listener when the call finishes
	res.on("finish", () => {
		logging.info(
			NAMESPACE,
			`METHOD - [${req.method}],  URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
		);
	});
	next();
});

// Injections
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); // Not having to call JSON.parse;

/* Routes of API */
router.use((req, res, next) => {
	res.header(`Access-Control-Allow-Origin`, `*`); // Request may come from anywhere
	res.header(
		`Access-Control-Allow-Headers`,
		`Origin, X-Requested-With, Content-Type, Accept, Authorization`
	);

	if (req.method == `OPTIONS`) {
		res.header(`Access-Control-Allow-Methods`, `GET PATCH DELETE POST PUT`);
		return res.status(200).json({});
	}
	next();
});

// Routes
router.use("/sample", sampleRoutes);
router.use("/items", itemRoutes);
router.use("/download", downloadRoute);

/* Routes */
router.use((req, res, next) => {
	const error = new Error("Not found");
	return res.status(404).json({
		message: error.message
	});
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
	logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`)
);
