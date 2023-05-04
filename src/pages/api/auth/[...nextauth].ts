import NextAuth from 'next-auth/next';
import GitHubProvider  from 'next-auth/providers/github';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "read:user" },
            },
        })
    ]
});