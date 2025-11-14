
const passport = require("passport");
const {User} = require("../models/sql");
const { _userType } = require("../utils");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URI, 
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                const googleId = profile.id;
                const email = profile.emails?.[0]?.value;
                const username = profile.displayName;

                let user = await User.findOne({ where: { google_id: googleId } });

                if (user) return done(null, user);

                user = await User.findOne({ where: { email } });

                if (user) {
                    user.google_id = googleId;
                    await user.save();
                    return done(null, user);
                }

                const newUser = await User.create({
                    email,
                    username,
                    google_id: googleId,
                    role: _userType.user
                });

                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);



module.exports = passport ; 