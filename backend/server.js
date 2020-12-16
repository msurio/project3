const http = require('http');
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const socketio = require('socket.io');
const router = require('./router');
const app = express();
const server = app.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));
const io = socketio(server);
const User = require("./models/user")




const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { nextTick } = require("process");






app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to Chat Room "${user.room}."` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});

//local:
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/soulmate",
//   { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
//   () => {
//     console.log("Mongoose is Connected");
//   }
// );

//atlas:
mongoose.connect(
  "mongodb+srv://user:user@cluster0.bp2cl.mongodb.net/solemate?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is Connected");
  }
);

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


//Routes:
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn; (user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated")
        console.log(req.user);
      })
    } console.log (req,user)
  }) 
    (req, res, next)
});



app.post("/register", (req, res) => {
  console.log("add req",req.body)
  User.findOne({ username: req.body.username }, async (err, doc) => {
   
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) { 
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        age: req.body.age,
        picture: req.body.userPicture,
        activities: req.body.activities,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.post("/login", (req, res) => {
    res.send(req.user);
});

app.post("/User", (req, res) => {
  res.send(req, user);
});

