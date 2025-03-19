import express from "express";
const router = express.Router();

import {index, show, storeReview, store} from "../controllers/movieController.js";

router.get("/", index);
router.get("/:id", show);
router.post("/:id/reviews", storeReview);
router.post("/", store);

export default router; 