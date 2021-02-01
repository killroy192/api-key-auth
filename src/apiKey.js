import fs from 'fs';
import readline from 'readline';

const keys = [];

export const readConfigFile = () => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(new URL('../apikeys', import.meta.url)),
  });
  rl.on('line', keys.push.bind(keys));
  rl.on('error', reject);
  rl.on('close', resolve);
});

export const validate = ({ apiKey }) => keys.includes(apiKey);
