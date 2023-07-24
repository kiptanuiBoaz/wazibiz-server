require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to eShop website.");
});

//stripe pay route
app.use("/stripe-payment", require("./routes/stripe.js"));

//create token 
app.use("/mpesa-payment", require("./routes/mpesa.js"));



const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));