import fs from 'fs';
import readline from 'readline';

const keys = [];

export const readConfigFile = fileAbsolutePath => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(fileAbsolutePath),
  });
  rl.on('line', keys.push.bind(keys))
  rl.on('error', reject);
  rl.on('close', resolve)
})

export const validate = ({ apiKey }) => keys.includes(apiKey);