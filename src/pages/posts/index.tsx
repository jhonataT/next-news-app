import Link from 'next/link';
import * as prismicH from '@prismicio/helpers'
import { CustomHead } from '@/components/Head';
import { getPrismicClient } from '@/services/prismic';
import { GetStaticProps } from 'next/types';
import styles from './styles.module.scss';

interface Post {
    uid: string;
    title: string;
    summary: string;
    updatedAt: string;
    image?: {
        dimensions: { width: number, height: number };
        alt: string;
        copyright?: string | null;
        url: string;
    };
    content?: string;
};

interface PostListScreenProps {
    posts: Post[];
};

const PostListScreen = ({ posts }: PostListScreenProps) => {
    return <>
        <CustomHead title='Posts | NextNews' />
        <main className={styles.container}>
            <div className={styles.content}>
                {
                    Array.isArray(posts) && posts.map((post: Post) => (
                        <Link href={`/posts/${post.uid}`} key={post.uid}>
                            <time>{post.updatedAt}</time>
                            <strong>
                                {post.title}
                            </strong>
                            <p>
                                {post.summary}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </main>
    
    </>
}

export default PostListScreen;

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getAllByType('article', {
        fetch: ['title', 'publishDate', 'text'],
        pageSize: 100
    });

    let dataToResponse: Post[] = [];

    if(Array.isArray(response)) {
        dataToResponse = response.map((post) => ({
            uid: post?.uid,
            title: prismicH.asText(post.data.title),
            summary: post.data.slices[0].primary.text.find((content: any) => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-us', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
            image: post?.data?.featuredImage,
            content: post?.data?.slices[0]?.primary?.text[0]
        })) as Post[]
    }

    return {
        props: {
            posts: dataToResponse
        },
        revalidate: 60 * 60 * 24 // 24h
    }
}