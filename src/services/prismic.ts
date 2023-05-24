import * as Prismic from '@prismicio/client';

export const getPrismicClient = () => {
    const prismic = Prismic.createClient('newsAppJT', {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    })

    return prismic;
}