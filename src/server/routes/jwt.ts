// /* eslint-disable @typescript-eslint/no-unused-vars */
// import express, { Router } from 'express';
// import { sign } from 'jsonwebtoken';
// import passport from '../auth';

// const router = Router();

// router
//   .use('/jwt', passport.initialize())
//   .use('/jwt', passport.session())
//   .use('/jwt', express.json())
//   .route('/jwt')
//   .get(
//     (req, res) => {
//       try {
//         const { 
//           session: { 
//             passport: { user }
//           } 
//         }: { 
//           session?: { 
//             passport: { user: { username: string } }
//           } } = req as any;

//         const token = sign({ ...user }, process.env.SECRET, {
//           issuer: process.env.JWT_ISSUER,
//           audience: process.env.JWT_AUDIENCE
//         });

//         res.json({
//           token
//         });
//       } catch (error) {
//         res.send(401);
//       }
//     }
//   );


// const server = express()
//   .use(router);

// export default server;
export {};
