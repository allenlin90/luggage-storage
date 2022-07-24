import type { FC } from 'react';
import { useEffect } from 'react';
// import uploadImgs from 'utils/uploadImgs';

export interface IImgUploadProps {
  images: File[];
}

export const ImgUpload: FC<IImgUploadProps> = ({ images }) => {
  useEffect(() => {
    // const controller = uploadImgs(images);
    // return () => controller.abort();
  }, [images]);

  return null;
};

export default ImgUpload;
