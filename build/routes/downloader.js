"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var downloader_1 = __importDefault(require("../controllers/downloader"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/", downloader_1.default.StandAlone);
module.exports = router;
