import type { FC } from 'react';
import type {
  DragStart,
  DropResult,
  DragDropContextProps,
} from 'react-beautiful-dnd';

import { useState } from 'react';
import { useWarehouse } from 'context';
import { Box } from '@mui/material';
import WarehouseDrop from 'components/warehouse/dnd/WarehouseDrop';
import WarehouseDrag from 'components/warehouse/dnd/WarehouseDrag';

import dynamic from 'next/dynamic';
const DragDropContext = dynamic<DragDropContextProps>(() =>
  import('react-beautiful-dnd').then((mod) => mod.DragDropContext)
);

export const WarehouseDnD: FC = () => {
  const [warehouse] = useWarehouse();
  const [col1, setCol1] = useState([
    { id: '1', col: '1' },
    { id: '2', col: '1' },
  ]);
  const [col2, setCol2] = useState([{ id: '3', col: '2' }]);

  const toggleSelection = (id: string) => {};
  const toggleSelectionInGroup = (id: string) => {};
  const multiSelectTo = (id: string) => {};
  const onDragStart = (start: DragStart) => {};

  const onDragEnd = (result: DropResult) => {
    const {
      destination,
      // draggableId,
      source,
    } = result;
    let movedItem;
    let array;
    if (source?.droppableId === '1') {
      array = [...col1];
      movedItem = array.splice(source?.index, 1);
      setCol1(array);
    } else if (source?.droppableId === '2') {
      array = [...col2];
      movedItem = array.splice(source?.index, 1);
      setCol2(array);
    }

    if (destination?.droppableId === '1') {
      if (destination?.droppableId !== source?.droppableId) {
        array = [...col1];
      }
      if (movedItem && array) {
        array.splice(destination?.index, 0, movedItem[0]);
        setCol1(array);
      }
    } else if (destination?.droppableId === '2') {
      if (destination?.droppableId !== source?.droppableId) {
        array = [...col2];
      }
      if (movedItem && array) {
        array.splice(destination?.index, 0, movedItem[0]);
        setCol2(array);
      }
    }

    array = undefined;
    movedItem = undefined;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <WarehouseDrop id='1'>
          {col1.map((item, index) => (
            <WarehouseDrag
              item={item}
              index={index}
              key={item.id}
              toggleSelection={toggleSelection}
              toggleSelectionInGroup={toggleSelectionInGroup}
              multiSelectTo={multiSelectTo}
            />
          ))}
        </WarehouseDrop>
        <WarehouseDrop id='2'>
          {col2.map((item, index) => (
            <WarehouseDrag
              item={item}
              index={index}
              key={item.id}
              toggleSelection={toggleSelection}
              toggleSelectionInGroup={toggleSelectionInGroup}
              multiSelectTo={multiSelectTo}
            />
          ))}
        </WarehouseDrop>
      </Box>
    </DragDropContext>
  );
};

export default WarehouseDnD;
