const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const users = require("./routes/api/users");
const passport = require("passport");

const app = express();

//npm run server

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//db conect
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongo db connnected"))
  .catch(err => console.log(err));

//passport middleware
passport.use(passport.initialize());
// Passport Config
// require("./config/passport")(passport);

//use routes
app.use("/api/users", users);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
