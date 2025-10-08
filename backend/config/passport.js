
const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const User = require("../models/User");
const dotenv = require("dotenv");


dotenv.config();

//   LOCAL STRATEGY 
passport.use(
    new LocalStrategy(
      { usernameField: "email" }, // use 'email' instead of default 'username'
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email }); // find user by email
          if (!user) return done(null, false, { message: "User not found" });
  
          const isMatch = await user.comparePassword(password);
          if(!isMatch) return res.status(400).json({error:"Invalid Credentials"})
  
          return done(null, user); // success
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  


  // GOOGLE STRATEGY
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback", // redirect after login
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.create({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
          }
         return done(null, user);
        } catch (err) {
        return  done(err, false);
        }
      }
    )
  );

  // serialize + deserialize (optional if using sessions)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then((u) => done(null, u)));
  
  // FACEBOOK STRATEGY 
//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//         callbackURL: "/api/auth/facebook/callback",
//         profileFields: ["id", "displayName", "emails"], // request email and name
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//           let user = await User.findOne({ facebookId: profile.id });
//           if (!user) {
//             user = await User.create({
//               name: profile.displayName,
//               email: profile.emails?.[0]?.value || "",
//               facebookId: profile.id,
//             });
//           }
//           done(null, user);
//         } catch (err) {
//           done(err, false);
//         }
//       }
//     )
//   );
  