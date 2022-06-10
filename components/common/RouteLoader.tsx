import { FC, ReactNode } from 'react';

export const RouteLoader: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default RouteLoader;
