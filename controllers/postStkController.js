const axios = require("axios");
const { calculateOrderAmount } = require("../lib/orderAmount");
require("dotenv").config();

const postStk = async (req, res) => {
    const shortCode = 174379;
    const phone = req.body.phone.substring(1);
    //calculate the amount using libary
    const amount = Math.floor(calculateOrderAmount(req.body.items) / 140);
    const passkey = process.env.passkey;

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const date = new Date();

    const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const password = new Buffer.from(shortCode + passkey + timestamp).toString("base64");
console.log(process.env.TransactionType)
    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: process.env.TransactionType,
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        CallBackURL: "https://mydomain.com/path",
        AccountReference: "Mpesa Test",
        TransactionDesc: "Testing stk push",
    };

    await axios
        .post(url, data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((data) => {
            res.status(200).json(data.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err.message);
        });
};

module.exports = { postStk };