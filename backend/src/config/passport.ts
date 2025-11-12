import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback,
} from "passport-google-oauth20";
import {
  Strategy as GitHubStrategy,
  Profile as GithubProfile,
} from "passport-github2";
import axios from "axios";
import { User } from "../model/User";
import { sendEmail } from "../utils/mailer";
import { generateWelcomeEmail } from "../utils/emailTemplates";

// ---------------- GOOGLE STRATEGY ----------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (
      _accessToken,
      _refreshToken,
      profile: GoogleProfile,
      done: VerifyCallback
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Check if a user exists by email (manual signup)
          user = await User.findOne({ email: profile.emails?.[0].value });

          if (user) {
            // Link Google ID to existing user
            user.googleId = profile.id;
            user.isVerified = true;
            await user.save();
          } else {
            // Create new user
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName || "Google User",
              email: profile.emails?.[0].value,
              profileImage: { url: profile.photos?.[0]?.value || "" },
              role: "user",
              isVerified: true,
            });

            // Send welcome email
            const html = generateWelcomeEmail(user.name);
            await sendEmail(user.email, "Welcome to Our App 🎉", html);
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error, false);
      }
    }
  )
);

// ---------------- GITHUB STRATEGY ----------------
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:8000/auth/github/callback",
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      _refreshToken: string,
      profile: GithubProfile,
      done: VerifyCallback
    ) => {
      try {
        const githubId = profile.id;
        const displayName =
          profile.displayName || profile.username || "GitHub User";
        let email = profile.emails?.[0]?.value || null;
        const photo = profile.photos?.[0]?.value || "";

        // Fallback: fetch email via GitHub API if missing
        if (!email) {
          try {
            const emailRes = await axios.get(
              "https://api.github.com/user/emails",
              {
                headers: {
                  Authorization: `token ${accessToken}`,
                  "User-Agent": "Node.js",
                },
              }
            );

            if (Array.isArray(emailRes.data) && emailRes.data.length > 0) {
              const primaryEmailObj =
                emailRes.data.find((e: any) => e.primary) || emailRes.data[0];
              email = primaryEmailObj?.email || null;
            }
          } catch (err) {
            console.warn("Failed to fetch GitHub email fallback:", err);
          }
        }

        if (!email) {
          return done(new Error("Unable to retrieve email from GitHub"), false);
        }

        // Find existing user by GitHub ID or email
        let user = await User.findOne({ githubId });
        if (!user) {
          user = await User.findOne({ email });

          if (user) {
            // Link GitHub ID to existing user
            user.githubId = githubId;
            user.isVerified = true;
            await user.save();
          } else {
            // Create new user
            user = await User.create({
              githubId,
              name: displayName,
              email,
              profileImage: { url: photo },
              role: "user",
              isVerified: true,
            });

            // Send welcome email
            const html = generateWelcomeEmail(user.name);
            await sendEmail(user.email, "Welcome to Our App 🎉", html);
          }
        }

        return done(null, user);
      } catch (err) {
        console.error("❌ GitHub Strategy Error:", err);
        return done(err as Error, false);
      }
    }
  )
);

export default passport;
