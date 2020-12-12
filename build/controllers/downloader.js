"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = "Downloader Controllers";
var StandAlone = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "A single object is being downloaded");
    var url = req.query.url || "";
    console.log(url);
    return res.status(200).json({
        message: "SUCCESS",
        url: url
    });
};
exports.default = { StandAlone: StandAlone };
