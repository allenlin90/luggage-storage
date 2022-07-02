import { FC, ReactNode, KeyboardEvent, MouseEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import { wasToggleInSelectionGroupKeyUsed, wasMultiSelectKeyUsed } from 'utils';

export interface WarehouseDragProps {
  item: { id: string; [key: string]: any };
  content?: ReactNode;
  index: number;
  isProcessing?: boolean;
  toggleSelection?: (id: string) => void;
  toggleSelectionInGroup?: (id: string) => void;
  multiSelectTo?: (id: string) => void;
}

export const WarehouseDrag: FC<WarehouseDragProps> = ({
  item,
  index,
  isProcessing = false,
  content = null,
  toggleSelection,
  toggleSelectionInGroup,
  multiSelectTo,
  ...props
}) => {
  const performAction = (event: MouseEvent | KeyboardEvent) => {
    if (wasToggleInSelectionGroupKeyUsed(event) && toggleSelectionInGroup) {
      toggleSelectionInGroup(item.id);
      return;
    }

    if (wasMultiSelectKeyUsed(event) && multiSelectTo) {
      multiSelectTo(item.id);
      return;
    }

    if (toggleSelection) {
      toggleSelection(item.id);
    }
  };

  const onClick = (event: MouseEvent<HTMLLIElement>) => {
    if (event.defaultPrevented) return;

    // marking the event as used
    event.preventDefault();
    performAction(event);
  };

  const onKeyDown = ({
    event,
    snapshot,
  }: {
    event: KeyboardEvent<HTMLLIElement>;
    snapshot: DraggableStateSnapshot;
  }) => {
    if (event.defaultPrevented) return;

    if (snapshot.isDragging) return;

    event.preventDefault();
    performAction(event);
  };

  return (
    <Draggable
      draggableId={item.id}
      index={index}
      key={item.id}
      isDragDisabled={isProcessing}
    >
      {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
        <ListItem
          sx={{
            border: '1px solid #333',
            borderColor: snapshot.isDragging ? '#1976d2' : 'inherit',
            marginY: '1rem',
            boxSizing: 'border-box',
          }}
          onKeyDown={(event) => onKeyDown({ event, snapshot })}
          onClick={(event) => onClick(event)}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
        >
          <ListItemText>{content ?? item.id}</ListItemText>
          <ListItemIcon sx={{ justifyContent: 'end' }}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      )}
    </Draggable>
  );
};

export default WarehouseDrag;
