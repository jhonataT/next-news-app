import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import { api } from '@/services/api';
import { getStripeJs } from '@/services/stripe-js';
import { customToast } from '../Toast';

interface SubscribeButtonProps {
    priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
    const { status, data } = useSession();
    
    const handleSubscribe = async () => {
        if(!data?.user || status !== 'authenticated') {
            customToast('Login is required!', 'info')
            signIn('github');
            return;
        }

        try {
            const response = await api.post('/subscribe')

            console.log(response);

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe?.redirectToCheckout({ sessionId })
        } catch(error) {
            console.log("ERROR", error)
            customToast('Error, try again!', 'error')
        }
    }

    return <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
    >
        Subscribe now
    </button>
}