import { readFileSync } from 'fs';
import { resolve } from 'path';

export default {
  httpsOptions: {
    key: readFileSync(
      resolve(__dirname, '..', '..', '..', 'certificates', 'fireheet.key'),
    ),
    cert: readFileSync(
      resolve(__dirname, '..', '..', '..', 'certificates', 'fireheet.pem'),
    ),
  },
};
