"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("./config/config"));
var logging_1 = __importDefault(require("./config/logging"));
var sample_1 = __importDefault(require("./routes/sample"));
var items_1 = __importDefault(require("./routes/items"));
var NAMESPACE = "Server";
var router = express_1.default();
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "]");
    // Listener when the call finishes
    res.on("finish", function () {
        logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "],  URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "], STATUS - [" + res.statusCode + "]");
    });
    next();
});
// Injections
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json()); // Not having to call JSON.parse;
/* Routes of API */
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Request may come from anywhere
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }
    next();
});
router.use("/sample", sample_1.default);
router.use("/items", items_1.default);
/* Routes */
router.use(function (req, res, next) {
    var error = new Error("Not found");
    return res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () {
    return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port);
});
