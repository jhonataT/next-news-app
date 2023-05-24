import { CustomHead } from '@/components/Head';
import styles from './styles.module.scss';

const PostScreen = () => {
    return <>
        <CustomHead title='Posts | NextNews' />
        <main className={styles.container}>
            <div className={styles.content}>
                <a href='#'>
                    <time>May 24, 2023</time>
                    <strong>
                        Introduction to React Hooks: Enhancing Functionality and State Management
                    </strong>
                    <p>
                        React, a widely popular JavaScript library for building user interfaces, introduced Hooks in version 16.8 as a way to add state and other features to functional components. Before Hooks, developers had to use class components to access state and lifecycle methods.
                        With Hooks, React functional components gained the ability to manage state, use lifecycle methods, and incorporate other advanced features.
                    </p>
                </a>
                <a href='#'>
                    <time>May 24, 2023</time>
                    <strong>
                        Introduction to React Hooks: Enhancing Functionality and State Management
                    </strong>
                    <p>
                        React, a widely popular JavaScript library for building user interfaces, introduced Hooks in version 16.8 as a way to add state and other features to functional components. Before Hooks, developers had to use class components to access state and lifecycle methods.
                        With Hooks, React functional components gained the ability to manage state, use lifecycle methods, and incorporate other advanced features.
                    </p>
                </a>
                <a href='#'>
                    <time>May 24, 2023</time>
                    <strong>
                        Introduction to React Hooks: Enhancing Functionality and State Management
                    </strong>
                    <p>
                        React, a widely popular JavaScript library for building user interfaces, introduced Hooks in version 16.8 as a way to add state and other features to functional components. Before Hooks, developers had to use class components to access state and lifecycle methods.
                        With Hooks, React functional components gained the ability to manage state, use lifecycle methods, and incorporate other advanced features.
                    </p>
                </a>
            </div>
        </main>
    
    </>
}

export default PostScreen;