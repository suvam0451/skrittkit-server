import express from "express";
import controller from "../controllers/items";
const router = express.Router();

router.get("/", controller.fetchItemList);

export = router;
