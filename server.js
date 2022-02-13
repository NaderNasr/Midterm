// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['df9c8e16-42ca-46a3-8457-aa83a2e94930', 'dd2f9568-af42-4ccf-abfe-da1f5563d6d0']
}));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const websitesRoutes = require("./routes/websites");
const organizationsRoutes = require("./routes/organizations");
const { password } = require("pg/lib/defaults");




// const registerRoutes = require("./routes/register");
// const registerRoutes = require("./routes/register");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/organizations", organizationsRoutes(db));
app.use("/api/websites", websitesRoutes(db));
// app.use("/api/register", registerRoutes(db));


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  console.log(req.session);
  res.render('index');
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Add function in helper dir
const addUser = (name, password, email) => {
  return db.query(`
  INSERT INTO users (name, password, email )
  VALUES($1, $2, $3) RETURNING *;`, [name, password, email])
    .then((result) => result.rows[0])
    .catch((error) => {
      console.log(error.message);
    });
};

//Fix to authenticate email
app.post("/register", (req, res) => {
  let name = req.body.name;
  let hashedPassword = bcrypt.hashSync(req.body.password[0], 12);
  let email = req.body.email;
  //verify email
  addUser(name, hashedPassword, email);
  res.render('index');
  //if email exists alert user
});

const getUserWithEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE users.email = $1;` ,[email])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password[0];
  console.log('HELLO    ',password);

  if (!email || !password) {
    console.log('input cant be empty');
    return;
  }

  getUserWithEmail(email)
    .then((result) => {
      if (!result || !bcrypt.compareSync(password, result.password)) {
        console.log('wrong email');
        return;
      }
      return res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/register');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/login", (req,res) => {
  res.render("login");
});


app.get("/register", function(req, res) {


  res.render("register");
});
