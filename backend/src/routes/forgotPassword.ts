import express from "express";

import { handleForgotPassword } from "../controllers/handleForgotPassword";

const router = express.Router();

router.post("/", handleForgotPassword);

export default router;
