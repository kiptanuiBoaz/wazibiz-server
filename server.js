require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mpesaPayRoute = require("./routes/mpesa");
const stripePayRoute = require("./routes/stripe");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to eShop website.");
});

//stripe pay route
app.post("/create-payment-intent", stripePayRoute);

//create token 
app.use("/mpesa-payment", mpesaPayRoute);


const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));