require("dotenv").config();

const mpesaResult = async (req, res) => {
    console.log(req.body);
    // res.send("okay")
};

module.exports = {mpesaResult};