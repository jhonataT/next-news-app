import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export const SignInButton = () => {
    const { status, data } = useSession();

    return status === 'authenticated' ? (
        <button
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color='#04d361'/>
            <span>{data.user?.name}</span>
            <FiX  color='#737380' className={styles.closeIcon}/>
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color='#eba417'/>
            <span>Sign with Github</span>
        </button>
    )
}