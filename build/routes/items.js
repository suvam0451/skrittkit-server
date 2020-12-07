"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var items_1 = __importDefault(require("../controllers/items"));
var router = express_1.default.Router();
router.get("/", items_1.default.fetchItemList);
module.exports = router;
