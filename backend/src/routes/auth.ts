import express from "express";
import { validate } from "../middleware/validate";
import { handleLogin } from "../controllers/handleLogin";
import { authSchema } from "../schemas/authSchema";

const router = express.Router();

router.post("/", validate(authSchema), handleLogin);

export default router;
