import storage from 'node-persist';
import cryptoRandomString from 'crypto-random-string';

export const init = () => storage.init({
  dir: './keystore',
});

export const create = async () => {
  const newStr = cryptoRandomString({ length: 30, type: 'url-safe' });
  await storage.setItem(newStr, true);
  return newStr;
};

export const validate = async ({ apiKey }) => storage.getItem(apiKey);
