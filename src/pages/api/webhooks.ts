// stripe listen --forward-to localhoist:3000/api/webhooks
import { stripe } from "@/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";

const getBuffer = async (readable: Readable) => {
    const chuncks = [];

    for await (const chunk of readable) {
        chuncks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chuncks);
}

export const config = {
    api: {
        bodryParser: false
    }
};

const relevantEvents = new Set([
    'checkout.session.completed'
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const newBuffer: Buffer = await getBuffer(req);

    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            newBuffer,
            secret as string | Buffer | string[],
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
    } catch(error: any) {
        return res.status(400).send(`Webhook error: ${error?.message}`);
    }

    const { type: eventType } = event;

    if(relevantEvents.has(eventType)) {
        // make anything
    }

    res.status(200).json({ status: 'success' });
}