import { GetStaticProps } from 'next';
import { CustomHead } from '@/components/Head';
import { SubscribeButton } from '@/components/SubscribeButton';
import { stripe } from '@/services/stripe';
import styles from './home.module.scss'; 

interface HomeProps {
  priceId: string,
  amount: number,
};

const Home = (props: HomeProps) => {
  return (
    <>
      <CustomHead title="Home | NewsApp"/>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the
            <span> NextJS </span>
            world.
          </h1>
          <p>
            Get access to all the publications <br/>
            <span>for {props.amount} month</span>
          </p>
          <SubscribeButton priceId={props.priceId}/>
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

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1N3cOxDqrh9Dty7ibH2SnvaQ');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount || 0) / 100),
  };

  return {
    props: {...product},
    revalidate: 60 * 60 * 24 // 24h
  }
}
