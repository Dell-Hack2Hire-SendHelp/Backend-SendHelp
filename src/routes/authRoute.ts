import { Router } from "express";
import crypto from "crypto";
import passport from "passport";

import { DB } from "../config/db";
const db = DB.instance;

const router = Router();



router.get('/failedLogin', (req, res)=> {
    res.status(401);
    res.json({ error: "Invalid username or password" });
});

router.get('/successfulLogin', (req, res)=> {
    res.status(200);
    res.json({ message: "Logged in successfully" });
});

router.get('/status', (req, res)=> {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    res.status(200).json(req.user);
});





router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/successfulLogin', 
    failureRedirect: '/auth/failedLogin',
}));


router.post('/signup', async (req, res)=> {
    const { email, username, password } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');

    await db.user.create({
        data: {
            email: email,
            salt: salt,
            username: username,
            password: passwordHash,
        }
    });

    res.status(201).json({ message: "User created successfully. Please login." });
});

router.post('/logout', (req, res)=> {
    req.logout((err: Error)=> {
        if (err) return res.status(500).json({ error: `Error logging out: ${err.message}` });
        res.redirect('/');
    });
});



export default router;