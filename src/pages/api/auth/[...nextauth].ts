import { query as q } from 'faunadb';
import { Account, NextAuthOptions, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { fauna } from '@/services/fauna';
import NextAuth from 'next-auth/next';
import GitHubProvider  from 'next-auth/providers/github';

interface SignInProps {
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
};

export const authOptions: NextAuthOptions = {
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
    callbacks: {
        async session({ session }): Promise<any> {

            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    'ref',
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user?.email as string)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                'active'
                            )
                        ])
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                }
            } catch(error) {
                return {
                    ...session,
                    activeSubscription: null
                } 
            }
        },
        async signIn({ user }: SignInProps ) {
            const { email } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email as string)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email as string)
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