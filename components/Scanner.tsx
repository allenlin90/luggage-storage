import { FC, useState } from 'react';
import { QrReader } from 'react-qr-reader';

export const Scanner: FC = () => {
  const [data, setData] = useState<string>();

  return (
    <>
      {/* <QrReader
        constraints={{
          facingMode: 'environment',
        }}
        onResult={(result, error) => {
          if (result) {
            setData(result.text);
          }

          if (error) {
            console.info(error);
          }
        }}
      /> */}
    </>
  );
};

export default Scanner;
