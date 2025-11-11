import express from "express";

import { handleLogout } from "../controllers/handleLogout";

const router = express.Router();

router.get("/", handleLogout);

export default router;
