import { Strategy, ExtractJwt } from 'passport-jwt';

const jwt = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
}, (payload: any, done: (error: any, user?: any, info?: any) => void) => 
  done(null, {username: console.log(payload) as unknown as true && payload.sub})
);

export default jwt;
