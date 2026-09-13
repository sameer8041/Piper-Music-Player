import express from 'express';
import * as userController from '../controller/user.controller.js'
import * as middlewares from  '../middleware/validation.middleware.js'
import passport from 'passport';



const router=express.Router();


router.post('/register',middlewares.registerUserValidation,userController.register);
router.post('/login',middlewares.loginUserValidation,userController.login);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),userController.GoogleAuth)



export default router;
