import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const WarehouseContext = createContext<
  [warehouse: any, setWarehouse: Dispatch<SetStateAction<any>>] | null
>(null);

export const useWarehouse = () => {
  const context = useContext(WarehouseContext);

  if (!context) {
    throw new Error(`useWarehouse must be used within a WarehouseProvider`);
  }

  return context;
};

export const WarehouseProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [warehouse, setWarehouse] = useState<any>(null);

  return (
    <WarehouseContext.Provider value={[warehouse, setWarehouse]}>
      {children}
    </WarehouseContext.Provider>
  );
};
