# Simple node.js api-key authorization service with docker secrets

## Features
- [x] persistent build-in apikeys storage
- [x] generate apikey via REST api
- [x] admin right with docker secrets
- [ ] logging
- [ ] setup TTL for apikey during generation
- [ ] removing apikey functionality

## API
- `GET /validate/:apiKey` - check api-key
- `POST /new-api-key` - create new api key. Body schema:
  ```js
  { "password": "admin_password" } 
  ```

## Usage
- create docker-compose config
  ```sh
  # docker-compose example
  version: "3.7"
  services:
    auth-api-key:
      image: killroy192/auth-api-key:latest
      environment:
        ADMIN_PASSWD: /run/secrets/adm_passwd
      ports:
        - 8080:8080
      volumes:
        - auth-store:/usr/src/app/keystore
      secrets:
        - adm_passwd
  secrets:
    adm_passwd:
      external: true
  volumes:
    auth-store:
  
  # build
  docker-compose build
  ```
- setup your secret
  ```sh
  docker swarm init
  openssl rand -hex 30 > ./secret.txt
  docker secret create adm_passwd ./secret.txt
  rm ./secret.txt
  ```
- run services
  ```sh
  docker stack deploy --compose-file docker-compose.yaml cluster
  ```