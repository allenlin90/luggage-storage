// import axios from 'axios';

export const uploadImgs = (): // images: File[]
AbortController => {
  const controller = new AbortController();
  // axios.post('/api/upload-img', {}, { signal: controller.signal });

  return controller;
};

export default uploadImgs;
