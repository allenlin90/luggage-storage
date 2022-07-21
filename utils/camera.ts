import type { Camera } from 'types/scanner';

export interface IStartCameraArgs {
  video: HTMLVideoElement;
  deviceId?: string;
  constraints?: MediaStreamConstraints;
  videoConstraints?: MediaTrackConstraints;
  onError?: (error: any) => void;
}

export const startCamera = async ({
  video,
  deviceId,
  constraints,
  videoConstraints,
  onError = () => undefined,
}: IStartCameraArgs): Promise<{
  devices: Camera[];
  stream: MediaStream;
} | void> => {
  try {
    if (window && navigator) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const stream = await navigator.mediaDevices.getUserMedia({
        ...constraints,
        video: {
          ...(!deviceId && { facingMode: 'environment' }),
          ...(deviceId && { deviceId: { exact: deviceId } }),
          ...videoConstraints,
        },
      });

      if (video) {
        video.srcObject = stream;
        video.play();
      }

      const videoInputs = Array.isArray(devices)
        ? devices
            .filter(({ kind }) => kind === 'videoinput')
            .map(({ deviceId, label }) => ({ id: deviceId, label }))
        : [];

      return { devices: videoInputs, stream };
    }
  } catch (error: any) {
    onError(error);
  }
};

export const stopCamera = async (
  video: HTMLVideoElement | null,
  stream: MediaStream
): Promise<void> => {
  video?.pause();
  video?.setAttribute('src', '');
  stream.getTracks().forEach((track) => track.stop());
};
