const axios = require("axios");
// ePKu93UtTzsqaEYG4hr5UwiEKcqwC07iRJBty7BZRFI2WhYibvQFavf9dm2/atabKat/5k8oDkk10hgxnMyfQhWs8inTuLU31Pb9BHkNtV4DzTV7PTSy4BQYXwnzFqdob9q0MWteLOW6Vwb2oWgqMr1PyBQcIJao0mFm9QrYgE8vamqcuwNcPnw/X2PrTZqknc0CBiF1Ki06Lrw2GD+tiJS8GKR2VIkdeZ9re3lrDu3Nshxu1CasnojOgnN9zEtbyM8i/EGKAIZvXAMMamx2TEAti1F3HkhhGyy2vw1Im0KsBNcDXNvmwhjOx8R6vIV/8fnA5+Demau4pttS5LnfSg==
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
            next();
        })
        .catch((err) => {
            console.log("here is the error")
            console.log(err);
            res.status(400).json(err.message);
        });
};

module.exports = { createToken };