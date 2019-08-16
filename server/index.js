require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

//controllers
const AC = require("./controllers/auth_controller");
const BC = require("./controllers/business_controller");
const ADC = require("./controllers/ad_controller");
const DC = require("./controllers/drink_controller");

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

//REGISTER / LOGIN
app.post("/auth/register", AC.register);
app.get("/auth/logout", AC.logout);
app.post("/auth/login", AC.login);
app.get("/auth/getsession", AC.getSession);

//should only be used for business users
app.get("/api/company", BC.getCompany);

//THIS IS USED FOR ADBUILDER
app.get("/api/company/:id", BC.getCompanyForAdBuilder);

// ADS TABLE
app.post("/api/ads", ADC.createAd);
app.delete("/api/ads/:id", ADC.deleteAd);
app.get("/api/company/ads/:id", ADC.getAdsForCompany);

//DRINK TABLE
app.get("/api/ad/drinks/:id", DC.getDrinksForAds);
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
