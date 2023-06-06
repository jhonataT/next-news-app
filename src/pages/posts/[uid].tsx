import { GetServerSideProps } from "next";
import * as prismicH from '@prismicio/helpers'
import { getPrismicClient } from "@/services/prismic";
import { getSession } from "next-auth/react";
import { CustomHead } from "@/components/Head";
import styles from './post.module.scss';

interface Post {
    uid: string;
    title: string;
    summary: string;
    updatedAt: string;
    content?: string;
};

interface PostSreenProps {
    post: Post;
};

const PostScreen = ({ post }: PostSreenProps) => {
    return <>
        <CustomHead title={`${post.title} | NextNews`}/>
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{ __html: post.content as string }}
                />
            </article>
        </main>
    </>
}

export default PostScreen;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req });

    console.log("session", session);

    if(!session?.activeSubscription) {
        console.log("AAAA")
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('post', `${params?.uid as string}` )
    let post: Post | {} = {};

    post = {
        uid: response?.uid,
        title: prismicH.asText(response.data.title),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-us', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        content: prismicH.asHTML(response.data.content)
    }

    return { props: {post} };
}