import express from "express";

import { handleTokenRefresh } from "../controllers/handleTokenRefresh";

const router = express.Router();

router.get("/", handleTokenRefresh);

export default router;
