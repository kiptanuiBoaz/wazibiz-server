const express = require("express");
const router = express.Router()
const { postStk } = require("../controllers/postStkController");
const { createToken } = require("../middleware/createToken");

router.post("/", createToken, postStk)
module.exports = router;