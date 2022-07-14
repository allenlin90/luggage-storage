import type { DragStart } from 'react-beautiful-dnd';

export const onDragStart = (start: DragStart) => {
  console.log(start);
};
