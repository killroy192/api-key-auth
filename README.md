# Simple node.js api-key authorization service with docker secrets

## Features
- [x] persistent build-in apikeys storage
- [x] generate apikey via REST api
- [x] admin right with docker secrets
- [ ] setup TTL for apikey during generation
- [ ] removing apikey functionality

## Usage
- create docker-compose config
  ```sh
  # docker-compose example
  version: "3.7"
  services:
    auth-api-key:
      image: killroy192/auth-api-key
      environment:
        ADMIN_PASSWD: /run/secrets/ADMIN_PASSWD
      restart: always
      ports:
        - 8080:8080
      volumes:
        - auth-store:/usr/src/app/keystore
  secrets:
    ADMIN_PASSWD:
      external: true
  volumes:
    auth-store:
  
  # build
  docker-compose build
  ```
- setup your secret
  ```sh
  docker swarm init
  nano ~/secret.txt
  docker secret create DB_PASSWORD ~/secret.txt
  rm ~/secret.txt
  ```
- run services
  ```sh
  docker-compose up
  ```