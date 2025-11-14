import express from "express";
import { handleMailVerification } from "../controllers/handleMailVerification";

const router = express.Router();

router.get("/", handleMailVerification);

export default router;
