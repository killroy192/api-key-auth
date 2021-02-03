FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY src ./src 

ENV NODE_ENV=production
ENV PORT=8080

RUN npm config ls && \
    npm install --no-package-lock && \
    npm cache clean --force

EXPOSE ${PORT}

CMD [ "node", "./src/index.js" ]
