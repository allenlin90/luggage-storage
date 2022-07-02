import { FC, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export const RecoilRootWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;
