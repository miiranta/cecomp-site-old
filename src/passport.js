const jwt               = require("jsonwebtoken")
const os                = require("os")
const passport          = require('passport')
const GoogleStrategy    = require('passport-google-oauth20').Strategy;
const User              = require("./db/models/users")
const getProfilePic     = require("./utils/profile/getProfilePicture")
const printToConsole    = require("./utils/other/printToConsole")

passport.serializeUser( async function(user, done) {

    try{

        const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET, {expiresIn:'10 days'})

        user.tokens = user.tokens.concat({token, machine: os.hostname(), os: os.type() + os.release()})
        await user.save()

        done(null, token)

    }catch{
      printToConsole('warning', 'Could not read cookie!')
      done(null, false, { message: 'Bad Session' })
    }
    

  });
  
passport.deserializeUser( async function(token, done) {

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await User.findOne({_id: decoded, "tokens.token": token})

        if(!user){throw new Error()}

        done(null, {...user.toObject(), token})

    }catch{
      printToConsole('warning', 'Could not verify token!')
      done(null, false, { message: 'Bad Session' })
    }


});


//---------------Start Google strategy----------------
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.URL+"/auth/google/redirect"
  },
  async (accessToken, refreshToken, profile, cb) => {

    const googleId = profile.id
    const email    = profile.emails[0].value
    const email_ext = email.split("@")[1]
    const name     = profile.displayName

    admin = 0
    if(email_ext == "usp.br"){ admin = 1 }

    try{

      const userDb = await User.findOne({email})

      const dataPic = await getProfilePic(profile.photos[0].value)

        if(!userDb){

          const user = await User.create({googleId, email, name, admin, profilePic: dataPic, nick: Date.now().toString(16)})
          printToConsole('session', 'Created new user: ', email, '')
          return cb(null, user)
        }

        await User.updateOne({email},{googleId, email, name, profilePic: dataPic})
        printToConsole('session', 'Login: ', email, '')
        return cb(null, userDb)
 
    }catch(e){cb(null, false, { message: 'Bad Session' })}

  }
));
//----------------------------------------------------
