import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
