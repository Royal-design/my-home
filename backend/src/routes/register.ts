import express from "express";
import { handleRegister } from "../controllers/handleRegister";
import { validate } from "../middleware/validate";
import { registerSchema } from "../schemas/registerSchema";

const router = express.Router();

router.post("/", validate(registerSchema), handleRegister);

export default router;
