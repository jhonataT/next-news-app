import { signIn, useSession } from 'next-auth/react';
import { getStripeJs } from '@/services/stripe-js';
import { api } from '@/services/api';
import { customToast } from '../Toast';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

interface SubscribeButtonProps {
    priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
    const { status, data  } = useSession();
    const router = useRouter();
    
    const handleSubscribe = async () => {
        if(!data?.user || status !== 'authenticated') {
            customToast('Login is required!', 'info')
            signIn('github');
            return;
        }

        if(data?.activeSubscription) {
            customToast('Your subscription is already active!', 'info')
            router.push('/posts')
            return;
        }

        try {
            const response = await api.post('/subscribe')
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