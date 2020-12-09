const User = require('./models/user');
const bcrypt = require('bcrypt.js')
const localStrategy = require('passport-local').Strategy

module.export = function(passport){
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({username: username}, (err,user) =>{
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err,res) => {
                    if (err) throw err;
                    if (res === true) {
                        return done(null,user);
                    }else {
                        return done(null, false)
                    }
                })
            })
        })
    )

    passport.serializeUser((user,cb) => {
        cb(null,user.id);
    })

    passport.deserializeUser((id, cb) => {
        user.findOne({_id: id}, (err, user) => {
            cb(err, user);
        })
    }) 
}