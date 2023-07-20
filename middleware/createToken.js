const axios = require("axios");

const createToken = async (req, res, next) => {
    const secret = process.env.secret;
    const consumer = process.env.consumer;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    await axios
        .get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    authorization: `Basic ${auth}`,
                },
            }
        )
        .then((data) => {
            token = data.data.access_token;
            console.log(data.data);
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err.message);
        });
};

module.exports = { createToken };