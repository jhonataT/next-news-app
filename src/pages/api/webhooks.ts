// stripe listen --forward-to localhost:3000/api/webhooks
import Stripe from "stripe";
import { stripe } from "@/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import { saveSubscription } from "./_lib/manageSubscription";

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
        bodyParser: false
    }
};

const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
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
        console.log("6")
        console.log("ERROR", error)
        return res.status(400).send(`Webhook error: ${error?.message}`);
    }
    
    const { type: eventType } = event;
    
    if(relevantEvents.has(eventType)) {
        try {
            switch (eventType) {
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    await saveSubscription(
                        checkoutSession.subscription?.toString() as string,
                        checkoutSession.customer?.toString() as string,
                        true
                    );
                    break;
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object as Stripe.Subscription;

                    await saveSubscription(
                        subscription.id,
                        subscription.customer.toString(),
                    )

                    break;
                default: 
                    throw new Error('Unhandled event.')
            }
        } catch(error) {
            res.json({ error });
        }
    }

    res.status(200).json({ status: 'success' });
}