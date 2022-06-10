import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { Seo } from 'components';

const HomePage: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/warehouse');
  }, [push]);

  return <Seo title='Home' />;
};

export default HomePage;
