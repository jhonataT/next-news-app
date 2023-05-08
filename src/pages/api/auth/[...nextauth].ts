import { query as q } from 'faunadb';
import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { fauna } from '@/services/fauna';
import NextAuth from 'next-auth/next';
import GitHubProvider  from 'next-auth/providers/github';

interface SignInProps {
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
};

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "read:user" },
            },
        })
    ],
    // jwt: {
    //     signingKey: process.env.SIGNING_KEY
    // },
    callbacks: {
        async signIn({ user, account, profile }: SignInProps ) {
            const { email } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get( // select
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    ),
                )

                return true;
            } catch {
                return false
            }
        }
    }
}

export default NextAuth(authOptions);