import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200;
  let message = 'success';
  let data: string | null = null;

  try {
    if (req.method !== 'POST') {
      status = 400;
      throw new Error('Bad request');
    }

    const img = req.body;
    data = img;
  } catch (error: any) {
    console.log("something went wrong in '/api/upload-img'");
    message = error?.response?.error?.message || error.message || error;
    console.log(message);

    if (/^2\d+/g.test(status.toString())) {
      status = 500;
    }
  }

  res.status(status).json({ status, message, data });
}
