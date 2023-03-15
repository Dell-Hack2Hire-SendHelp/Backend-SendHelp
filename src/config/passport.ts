import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as crypto from "crypto";

import { DB } from "../services/db";
import { AppUser } from "@prisma/client";


// The Express.User type has to be extended to include our own User model properties
declare global {
    namespace Express {
        interface User extends AppUser {}
    }
}


// Define how to serialize the user object into the session
passport.serializeUser((user, done)=> {
    done(null, user.id);
});

// Define how to deserialize the user object from the session to be put in req.user
passport.deserializeUser(async (id: number, cb)=> {
    const u = await DB.instance.appUser.findUnique({
        where: { id }
    });
    cb(null, u);
});



// Username + Password Local Strategy. 
// Define the function here to match username and password with the database
const localStrategy = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
    },
    async (username, password, cb)=> {
        const user = await DB.instance.appUser.findFirst({
            where: { 
                username: username 
            }
        });

        // No user found
        if (!user) return cb(null, false, { message: "Incorrect username or password"} );

        // Incorrect password
        const hash = crypto.pbkdf2Sync(password, user.passwordSalt, 1000, 64, "sha512").toString("hex");
        if (user.password !== hash) return cb(null, false, { message: "Incorrect username or password"} );

        return cb(null, user, { message: "Logged in successfully"} );
    }
);  


passport.use(localStrategy);
export { passport };