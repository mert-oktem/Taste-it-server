const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: '961559238124-crngppa4tj5g0lvsbjso8fmtigasrmh6.apps.googleusercontent.com',
    clientSecret: 'YBpfe4Gekh2SfXuD8THo4mP7',
    callbackURL: "http://localhost:5000/api/customers/login/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));