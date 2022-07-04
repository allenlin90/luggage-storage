import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Seo from 'components/common/Seo';

const HomePage: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push('/warehouse');
  }, [push]);

  return <Seo title='Home' />;
};

export default HomePage;
