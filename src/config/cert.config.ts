import { readFileSync } from 'fs';
import { resolve } from 'path';

import dotenv from 'dotenv';

const result = dotenv.config();

export default {
  httpsOptions: {
    key: readFileSync(
      resolve(
        __dirname,
        '..',
        '..',
        '..',
        'certificates',
        `${result.parsed.CERT_KEY_NAME}.key`,
      ),
    ),
    cert: readFileSync(
      resolve(
        __dirname,
        '..',
        '..',
        '..',
        'certificates',
        `${result.parsed.CERT_NAME}.pem`,
      ),
    ),
  },
};
