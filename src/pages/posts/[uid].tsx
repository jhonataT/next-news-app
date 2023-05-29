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

interface PostSreen {
    post: Post;
};

const PostScreen = ({ post }: PostSreen) => {
    console.log("post", {post})

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
    console.log("params", { params: params?.uid, session })

    // if(!session || !session?.user) {
    //     return;
    // }

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('article', `${params?.uid as string}` )
    let post: Post | {} = {};

    console.log(response.data)

    // prismicH.asHTML(response.data.slices)
    
    post = {
        uid: response?.uid,
        title: prismicH.asText(response.data.title),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-us', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        image: response?.data?.featuredImage,
        content: response.data.slices.reduce((previousSlices: string, slice: any) => {
            console.log({
                slice
            })
            switch (slice.slice_type) {
              case 'image_slice':
                return (
                  previousSlices +
                  `<img src="${slice.primary.example_image.url}" alt="${slice.primary.example_image.alt}" />`
                )
          
              case 'text_slice':
                return previousSlices + prismicH.asHTML(slice.primary.sample_text)
          
              default:
                return ''
            }
          }, '')
    }

    return { props: {post} };
}