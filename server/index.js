require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

//controllers
const AC = require("./controllers/auth_controller");

const app = express();
app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

//Register / Checkout
app.post("/auth/register", AC.register);
app.get("/auth/logout", AC.logout);
app.post("/auth/login", AC.login);
app.get("/auth/getsession", AC.getSession);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
