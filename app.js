const express = require('express')
const app = express()
const port = 3000
const passport = require('passport')
const jwt = require('passport-jwt')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mockPass = "111"
const mockUser = { "id": 1, "email": "ya@ya.com", "name": "hahah" }

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

function verifyJWT(payload) {
    return mockPass === payload.pass
  }

passport.use(new jwt.Strategy(
    opts, function (jwt_payload, done) {
        if (verifyJWT(jwt_payload)) {
            done(null, mockUser)
        } else {
            done(null, false)
        }
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  

app.get('/login', passport.authenticate("jwt", {failureRedirect: '/loginFailure'} ),
(req, res) => {
    res.send('..')
})

app.get('/loginFailure', (req, res) => {
    res.send('loginFailure')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})