import http from 'http';
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import * as apiKeyValidator from './apiKey.js';
import getAdminPasswd from './secret.js';

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    return res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
  return next();
});

(async () => {
  await apiKeyValidator.init();

  const adminPasswd = await getAdminPasswd();

  app.get('/validate/:apiKey', async (req, res) => {
    const isValid = await apiKeyValidator.validate(req.params);
    const code = isValid ? httpStatusCodes.OK : httpStatusCodes.UNAUTHORIZED;
    return res.sendStatus(code);
  });

  app.post('/generate', async (req, res) => {
    if (req.body.password === adminPasswd) {
      const newApiKey = await apiKeyValidator.create(req.body);
      return res.status(httpStatusCodes.CREATED).send({ key: newApiKey });
    }
    return res.sendStatus(httpStatusCodes.FORBIDDEN);
  });

  http.createServer(app).listen(
    PORT,
    () => {
      console.log(`auth service listening on $host:${PORT}`);
    },
  );
})();
