import styles from './styles.module.scss';

export const Header = () => {
    return <header className={styles.container}>
        <div className={styles.content}>
            <img src="/images/logo.svg" alt="logo"/>
            <nav>
                <a className={styles.active}>Home</a>
                <a>Posts</a>
            </nav>
        </div>
    </header>
}