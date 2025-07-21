const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../database/models").User;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        console.log(user);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
