"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = "Sample Controllers";
var updateItemList = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Item list update route called.");
    return res.status(200).json({
        message: "pong"
    });
};
var fetchItemList = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Item list fetch route called.");
    var id = req.query.id || -1;
    console.log(id);
    return res.status(200).json({
        message: id == -1 ? "item not found" : "item found"
    });
};
exports.default = { updateItemList: updateItemList, fetchItemList: fetchItemList };
