import { CustomHead } from '@/components/Head';
import styles from './home.module.scss';

const Home = () => {
  return (
    <>
      <CustomHead title="Home | NewsApp"/>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the
            <span> React </span>
            world.
          </h1>
          <p>
            Get access to all the publications <br/>
            <span>for $9.90 month</span>
          </p>
        </section>
        <img
          src="/images/avatar.svg"
          alt="Female figure programming a react application"
        />
      </main>
    </>
  )
}

export default Home;
