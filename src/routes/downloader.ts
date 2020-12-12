import exec from "child_process";
import controller from "../controllers/downloader";
import express from "express";
const router = express.Router();

router.get("/", controller.StandAlone);

export = router;
