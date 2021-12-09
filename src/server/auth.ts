import passport from "passport";
import password, { serialize, deserialize } from "@server/auth/password";
// import jwt from "@server/auth/jwt";

passport.use(password);

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
