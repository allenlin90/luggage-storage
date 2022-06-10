import NextAuth from 'next-auth';
import LineProvider from 'next-auth/providers/line';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

const clientId = process.env.LINE_ID as string;
const clientSecret = process.env.LINE_SECRET as string;

interface LINEToken extends JWT {
  accessToken: string;
  refreshToken: string;
}

interface QueryString {
  [key: string]: string;
}

const querystring = (obj: QueryString): string => {
  if (!Object.entries.length) return '';

  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

const refreshToken = async (token: LINEToken): Promise<LINEToken> => {
  const { refreshToken: refresh_token, accessToken: access_token } = token;
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    // const verify = await axios(
    //   `https://api.line.me/oauth2/v2.1/verify?access_token=${access_token}`
    // );
    // console.log(verify);

    // const { status } = await axios.post(
    //   'https://api.line.me/oauth2/v2.1/revoke',
    //   querystring({ ...params, access_token }),
    //   {
    //     headers: {
    //       'content-type': 'application/x-www-form-urlencoded',
    //     },
    //   }
    // );

    // if (status === 200) {
    //   console.log('access token is revoked');
    // }

    const { data: res } = await axios.post(
      'https://api.line.me/v2/oauth/accessToken',
      querystring({ ...params, grant_type: 'refresh_token', refresh_token }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('res');
    console.log(res);
  } catch (error: any) {
    console.log('something went wrong when refresh token');
    console.log(error?.response?.data ?? error);
  }

  return {
    ...token,
  };
};

const providers = [
  LineProvider({
    clientId,
    clientSecret,
  }),
];

export default NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    jwt: async (ctx) => {
      const { token, account } = ctx;

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = (account.expires_at as number) * 1000;
      }

      if (typeof token.expiresAt === 'number' && Date.now() < token.expiresAt) {
        return token;
      }

      const updatedToken = await refreshToken(token as LINEToken);

      return updatedToken;
    },
    session: async (ctx) => {
      const { session, token, user } = ctx;

      if (token) {
        const { expiresAt, accessToken } = token;
        session.token = {
          expiresAt: expiresAt as number,
          accessToken: accessToken as string,
          testExpiresAt: Date.now() + 20 * 1000,
        };
      }

      return session;
    },
  },
});
