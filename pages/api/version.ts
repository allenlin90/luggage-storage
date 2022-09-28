import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    publicRuntimeConfig: { version },
  } = getConfig();

  res.json({ version });
}
