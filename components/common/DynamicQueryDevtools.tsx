import type { FC } from 'react';
import getConfig from 'next/config';
import { ReactQueryDevtools } from 'react-query/devtools';

const {
  publicRuntimeConfig: { production },
} = getConfig();

export const DynamicQueryDevtools: FC = () => {
  return production ? null : <ReactQueryDevtools />;
};

export default DynamicQueryDevtools;
