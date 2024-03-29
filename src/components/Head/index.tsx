import Head from "next/head";

interface HeadProps {
    title: string;
};

export const CustomHead = ({ title = 'NewsApp' }: HeadProps ) => {
    return <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
    </Head>
}