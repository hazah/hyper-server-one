import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import Database from '../database';


passport.use(new LocalStrategy(async (username: String, _password: String, done: (error: Error|null, user: any) => void) => {
  // const _users = new Database('_users');
  // await _users.useAsAuthenticationDB();

  // const response = await _users.logIn(username, password);

  // if (response.ok) {
  //   const usernameHex = Array.from(username).map((c) => c.charCodeAt(0).toString(16)).join('');
  //   const userDBName = `userdb-${usernameHex}`;

  //   done(null, { userDBName, ...response });
  // } else {
  //   done(response);
  // }
  done(null, { username });
}));

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user as string));
});

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
}, (payload, done) => {
  console.log(payload);
  done(null, {username: payload.sub});
}));

export default passport;
