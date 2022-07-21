import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import { styled } from '@mui/material';

const StyledCanvas = styled('canvas')(() => ({
  width: '100%',
  height: '100%',
}));

export const Canvas: ForwardRefExoticComponent<
  RefAttributes<HTMLCanvasElement | null>
> = forwardRef<HTMLCanvasElement | null>((props, ref) => {
  return <StyledCanvas ref={ref} {...props} />;
});

Canvas.displayName = 'Canvas';

export default Canvas;
