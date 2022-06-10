import { FC, useState } from 'react';
import { useWarehouse } from 'context';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const WarehouseDnD: FC = () => {
  const [warehouse] = useWarehouse();
  const [col1, setCol1] = useState([
    { id: '1', col: '1' },
    { id: '2', col: '1' },
  ]);
  const [col2, setCol2] = useState([{ id: '3', col: '2' }]);

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Droppable droppableId='1'>
          {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => (
            <List
              sx={{
                border: '1px solid #333',
                padding: '1rem',
                boxSizing: 'border-box',
                backgroundColor: isDraggingOver
                  ? 'rgba(0, 0, 0, 0.05)'
                  : 'inherit',
              }}
              ref={innerRef}
              {...droppableProps}
            >
              {placeholder}
              {col1.map(({ id }, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {({ draggableProps, dragHandleProps, innerRef }) => (
                    <ListItem
                      sx={{
                        border: '1px solid #333',
                        marginY: '1rem',
                        boxSizing: 'border-box',
                      }}
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      <ListItemText>{id}</ListItemText>
                      <ListItemIcon sx={{ justifyContent: 'end' }}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  )}
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
        <Droppable droppableId='2'>
          {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => (
            <List
              sx={{
                border: '1px solid #333',
                padding: '1rem',
                boxSizing: 'border-box',
                backgroundColor: isDraggingOver
                  ? 'rgba(0, 0, 0, 0.05)'
                  : 'inherit',
              }}
              ref={innerRef}
              {...droppableProps}
            >
              {placeholder}
              {col2.map(({ id }, index) => (
                <Draggable draggableId={id} index={index} key={id}>
                  {({ draggableProps, dragHandleProps, innerRef }) => (
                    <ListItem
                      sx={{
                        border: '1px solid #333',
                        marginY: '1rem',
                        boxSizing: 'border-box',
                      }}
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      <ListItemText>{id}</ListItemText>
                    </ListItem>
                  )}
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

export default WarehouseDnD;
