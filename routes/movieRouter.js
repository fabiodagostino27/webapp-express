import express from "express";
import upload from "../middlewares/multer.js";
const router = express.Router();

import {index, show, storeReview, store} from "../controllers/movieController.js";

router.get("/", index);
router.get("/:id", show);
router.post("/:id/reviews", storeReview);
router.post("/", upload.single("image"), store);

export default router; 