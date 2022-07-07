import type { FC, ReactNode } from 'react';
import { List } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

export interface WarehouseDropProps {
  id: string;
  isProcessing?: boolean;
  children?: ReactNode;
}

export const WarehouseDrop: FC<WarehouseDropProps> = ({
  id,
  isProcessing = false,
  children = null,
}) => {
  return (
    <Droppable droppableId={id} isDropDisabled={isProcessing}>
      {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
        <List
          sx={{
            border: '1px solid #333',
            padding: '1rem',
            boxSizing: 'border-box',
            backgroundColor: isDraggingOver ? 'rgba(0, 0, 0, 0.01)' : 'inherit',
          }}
          ref={innerRef}
          {...droppableProps}
        >
          <>{children}</>
          {placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default WarehouseDrop;
