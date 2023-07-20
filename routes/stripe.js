const express = require("express");
const router = express.Router()
const { stripePay } = require("../controllers/paymentIntentController");

router.post("/", stripePay);
module.exports = router;