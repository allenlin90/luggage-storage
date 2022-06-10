import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { FC, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { SessionToken } from 'types';

export interface SessionCheckerProps {
  setter: Dispatch<SetStateAction<number>>;
}

export const SessionChecker: FC<SessionCheckerProps> = ({ setter }) => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const token = data?.token as SessionToken;

    if (
      status === 'unauthenticated' ||
      (data && (!token?.accessToken || !token.expiresAt))
    ) {
      signIn('line');
    }

    if (data?.tokenError) {
      signOut();
    } else {
      const expiresIn = data?.accessTokenExpiresIn as number;

      if (Date.now() >= expiresIn) {
        router.reload();
      } else if (typeof expiresIn === 'number') {
        setter(Math.round((expiresIn - Date.now()) / 1000));
      }
    }
  });

  return null;
};

export default SessionChecker;
