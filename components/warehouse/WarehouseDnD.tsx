import type { FC } from 'react';
import type { IWarehouse } from 'types/warehouse';
import type { DropResult, DragDropContextProps } from 'react-beautiful-dnd';

import { useState, useEffect, useRef } from 'react';
// import { useWarehouse } from 'context';
import { Box } from '@mui/material';
import WarehouseDrop from 'components/warehouse/dnd/WarehouseDrop';
import WarehouseDrag from 'components/warehouse/dnd/WarehouseDrag';
import { updateGroups } from 'utils/dnd/onDragEnd';

import dynamic from 'next/dynamic';
const DragDropContext = dynamic<DragDropContextProps>(() =>
  import('react-beautiful-dnd').then((mod) => mod.DragDropContext)
);

import { warehousesMock } from 'mocks/warehouse';

type WarehouseRef = {
  [key: string]: IWarehouse;
};

export const WarehouseDnD: FC = () => {
  // const [warehouse] = useWarehouse();
  const warehousesRef = useRef<WarehouseRef | null>(null);
  const [warehouses, setWarehouses] = useState(warehousesMock ?? []);

  useEffect(() => {
    warehousesRef.current = warehouses.reduce((store, warehouse) => {
      return { ...store, [warehouse.id]: warehouse };
    }, {});

    return () => {
      warehousesRef.current = null;
    };
  }, [warehouses]);

  return (
    <DragDropContext
      onDragEnd={(result: DropResult) => {
        // stop handling
        if (!result.destination) {
          // there's no destination (out of scope)
          return;
        }

        const updates = updateGroups(warehouses, {
          sourceDropId: result.source.droppableId,
          sourceItemIndex: result.source.index,
          destinationDropId: result.destination.droppableId,
          destinationItemIndex: result.destination.index,
        });

        if (updates) {
          setWarehouses(updates);
        }
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${warehouses.length}, 1fr)`,
          gap: '1rem',
          width: '100%',
          paddingBottom: '1.5rem',
        }}
      >
        {warehouses.map(({ id, items }) => (
          <WarehouseDrop key={id} id={id}>
            {items.map((item, index) => (
              <WarehouseDrag
                key={item.id}
                item={item}
                index={index}
                content={item?.meta?.title}
              />
            ))}
          </WarehouseDrop>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default WarehouseDnD;
