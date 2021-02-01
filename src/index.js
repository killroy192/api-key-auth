import http from 'http';
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import * as apiKeyValidator from './apiKey.js';

const { PORT, API_KEYS_FILE_PATH } = process.env;
const app = express();

(async () => {
  await apiKeyValidator.readConfigFile(API_KEYS_FILE_PATH);

  app.get('/validate/:apiKey', (req, res) => {
    if (apiKeyValidator.validate(req.params)) {
      return res.sendStatus(httpStatusCodes.OK);
    }
    return res.sendStatus(httpStatusCodes.UNAUTHORIZED);
  });

  http.createServer(app).listen(
    PORT,
    () => {
      console.log(`auth service listening on $host:${PORT}`);
    },
  );
})();
