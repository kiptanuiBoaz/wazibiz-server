const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
require("dotenv").config();
const { calculateOrderAmount } = require("../lib/orderAmount");

const stripePay = async (req, res) => {
    const { items, shipping, description } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
        description,
        shipping: {
            address: {
                line1: shipping.line1,
                line2: shipping.line2,
                city: shipping.city,
                country: shipping.country,
                postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
        },
        // receipt_email: customerEmail
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}
module.exports = { stripePay }