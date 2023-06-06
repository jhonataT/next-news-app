import Link from "next/link";
import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import * as prismicH from '@prismicio/helpers'
import { getPrismicClient } from "@/services/prismic";
import { CustomHead } from "@/components/Head";
import styles from '../post.module.scss';

interface Post {
    uid: string;
    title: string;
    summary: string;
    updatedAt: string;
    content?: string;
};

interface PostPreviewSreenProps {
    post: Post;
};

const PostPreviewScreen = ({ post }: PostPreviewSreenProps) => {
    const router = useRouter();
    const { data, status } = useSession();

    useEffect(() => {
        if(status && data?.activeSubscription) {
            router.push(`/posts/${post.uid}`);
        }
    }, [status])

    return <>
        <CustomHead title={`${post.title} | NextNews`}/>
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div
                    className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{ __html: post.content as string }}
                />
                <div className={styles.continueReading}>
                    <span>Wanna continue reading?</span>
                    <Link href='/'>Subscribe now 🥰</Link>
                </div>
            </article>
        </main>
    </>
}

export default PostPreviewScreen;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const prismic = getPrismicClient();

    const response = await prismic.getByUID('post', `${params?.uid as string}`);
    let post: Post | {} = {};

    post = {
        uid: response?.uid,
        title: prismicH.asText(response.data.title),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-us', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        content: prismicH.asHTML(response.data.content.splice(0, 2))
    }

    return { 
        props: {post},
        redirect: 60 * 30  // 30 minutes
    };
}