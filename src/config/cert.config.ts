import { readFileSync } from 'fs';
import { resolve } from 'path';

export default {
  httpsOptions: {
    key: readFileSync(
      resolve(
        __dirname,
        '..',
        '..',
        '..',
        'certificates',
        `${process.env.CERT_KEY_NAME}`,
      ),
    ),
    cert: readFileSync(
      resolve(
        __dirname,
        '..',
        '..',
        '..',
        'certificates',
        `${process.env.CERT_NAME}`,
      ),
    ),
  },
};
