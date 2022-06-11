import { KeyboardEvent, MouseEvent } from 'react';

export const wasToggleInSelectionGroupKeyUsed = (
  event: MouseEvent | KeyboardEvent
) => {
  const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
  return isUsingWindows ? event.ctrlKey : event.metaKey;
};

export const wasMultiSelectKeyUsed = (event: MouseEvent | KeyboardEvent) =>
  event.shiftKey;
