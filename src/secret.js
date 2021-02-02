import { readFile } from 'fs';
import { promisify } from 'util';

const readFrom = promisify(readFile);

const { NODE_ENV, ADMIN_PASSWD } = process.env;

export default () => {
  try {
    return NODE_ENV === 'production' ? readFrom('/run/secrets/ADMIN_PASSWD', 'utf8') : Promise.resolve(ADMIN_PASSWD);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`An error occurred while trying to read the secret: ADMIN_PASSWD. Err: ${err}`);
    } else {
      console.debug(`Could not find the secret, probably not running in swarm mode: ADMIN_PASSWD. Err: ${err}`);
    }
    return false;
  }
};
