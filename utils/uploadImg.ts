import axios from 'axios';

export const uploadImg = async (image: File): Promise<AbortController> => {
  const controller = new AbortController();
  const imgBase64 = await readFileAsync(image);
  axios.post(
    '/api/upload-img',
    { img: imgBase64 },
    {
      signal: controller.signal,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
    }
  );

  return controller;
};

export default uploadImg;

export function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
