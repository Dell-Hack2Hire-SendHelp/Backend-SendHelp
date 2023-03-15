import { Router } from "express";
import passport from "passport";

const router = Router();

import { getStatus, logOut, signUp, onFailedLogin, onSuccessLogin } from "../controllers/authController";



router.get('/failedLogin', onFailedLogin );
router.get('/successfulLogin', onSuccessLogin );
router.get('/status', getStatus );


router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/successfulLogin', 
    failureRedirect: '/auth/failedLogin',
}));
router.post('/signup', signUp );
router.post('/logout', logOut );



export default router;