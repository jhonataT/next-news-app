import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export const Header = () => {
    return <header className={styles.container}>
        <div className={styles.content}>
            <img src="/images/logo.svg" alt="logo"/>
            <nav>
                <ActiveLink
                    to='/'
                    activeClassName={styles.active}
                    label='Home'
                />
                <ActiveLink
                    to='/posts'
                    label='Posts'
                    activeClassName={styles.active}
                />
            </nav>
            <SignInButton />
        </div>
    </header>
}