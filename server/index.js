// Loads in environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import smartcar from "smartcar";

const app = express();
const port = 8000;

// Create a Smartcar OAuth client for your application.
const client = new smartcar.AuthClient({
  clientId: process.env.SMARTCAR_CLIENT_ID,
  clientSecret: process.env.SMARTCAR_CLIENT_SECRET,
  redirectUri: process.env.SMARTCAR_REDIRECT_URI,
  mode: "simulated",
});

// Global variable to save our access_token
let access;

app.get("/login", (req, res) => {
  const scope = ["read_vehicle_info"];
  const auth_url = client.getAuthUrl(scope);

  res.redirect(auth_url);
});

app.get("/exchange", function (req, res) {
  const code = req.query.code;

  console.log(code);

  res.sendStatus(200);
});

app.listen(port, () => console.log(`App listening to port: ${port}`));
