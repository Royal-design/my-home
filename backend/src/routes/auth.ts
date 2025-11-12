import express from "express";
import { validate } from "../middleware/validate";
import { handleLogin, handleSocialLogin } from "../controllers/handleLogin";
import { authSchema } from "../schemas/authSchema";
import passport from "../config/passport";
const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleSocialLogin
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  handleSocialLogin
);
router.post("/", validate(authSchema), handleLogin);

export default router;
