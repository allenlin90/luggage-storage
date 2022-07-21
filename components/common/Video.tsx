import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import { styled } from '@mui/material';

const StyledVideo = styled('video')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

export interface IVideoProps {
  open?: boolean;
}

export const Video: ForwardRefExoticComponent<
  IVideoProps & RefAttributes<HTMLVideoElement | null>
> = forwardRef<HTMLVideoElement | null, IVideoProps>(({ ...props }, ref) => {
  return <StyledVideo ref={ref} {...props} />;
});

Video.displayName = 'Video';

export default Video;
