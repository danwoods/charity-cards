// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const YOUR_DOMAIN = "http://localhost:3000";

export default (req, res) => {
  stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Charity Card",
              images: [
                "https://assets.listia.com/photos/d82e3260e4a311b11c79/original.png?s=320x320m&sig=8c1162a19b0b05fc&ts=1597320787",
              ],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    })
    .then((resp) => res.json({ id: resp.id }));
};
