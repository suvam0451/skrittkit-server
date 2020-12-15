"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var child_process_1 = require("child_process");
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
var AddSingleDownloadToYoutubeDL = function (req, res, next) {
    var url = req.query.url || "";
    console.log(url);
    child_process_1.exec("youtube-dl -x --audio-format mp3 --output /opt/music/\"%(title)s.%(ext)s\" " + url, function (err, stdout, stderr) {
        if (err) {
            console.log("error: " + err.message);
            return res.status(200).json({
                message: "error: " + err.message
            });
        }
        else if (stderr) {
            console.log("stderr: " + stderr);
            return res.status(200).json({
                message: "stderr: " + stderr
            });
        }
        else {
            return res.status(201).json({
                message: "Download completed successfully"
            });
        }
        console.log("stdout: " + stdout);
    });
    // exec(`youtube-dl add ${url}`, (err, stdout, stderr) => {
    // 	if (err) {
    // 		console.log(`error: ${err.message}`);
    // 		return;
    // 	}
    // 	if (stderr) {
    // 		console.log(`stderr: ${stderr}`);
    // 		return;
    // 	}
    // 	console.log(`stdout: ${stdout}`);
    // });
};
exports.default = { StandAlone: StandAlone, AddSingleDownloadToYoutubeDL: AddSingleDownloadToYoutubeDL };
