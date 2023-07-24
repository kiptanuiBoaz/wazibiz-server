const express = require("express");
const router = express.Router()
const { postStk } = require("../controllers/postStkController");
const { createToken } = require("../middleware/createToken");
const { mpesaResult } = require("../controllers/mpesaResultController");

router.post("/", createToken, postStk);
// router.post("/result", mpesaResult);
module.exports = router;