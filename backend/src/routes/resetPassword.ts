import express from "express";

import { handleResetPassword } from "../controllers/handleResetPassword";

const router = express.Router();

router.post("/", handleResetPassword);

export default router;
