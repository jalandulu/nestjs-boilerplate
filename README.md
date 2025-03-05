[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This boilerplate use **DDD Architecture**, please read the [Official article](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to get more information about DDD Architecture.

## Prerequisite

This project requires docker to run services, such as Database, Cache, SMTP, etc.

```
- Docker
```

Please visit the [Docker official site](https://www.docker.com/products/docker-desktop/) to download docker and the [Documentation](https://docs.docker.com/) to get more information about docker usage.

#### Services

- [PostgreSQL](https://hub.docker.com/_/postgres) (default)
- [Redis](https://hub.docker.com/_/redis) (default) - switch to [Dragonfly](https://www.dragonflydb.io/) for performance
- [Fake SMTP](https://hub.docker.com/r/rnwood/smtp4dev) (default)
- [MQTT5](https://hub.docker.com/_/eclipse-mosquitto) (default)

## Installation

#### Project

```bash
# install node modules
$ pnpm install

# copy the env example file to local env mode - [local, development, productionn]
$ cp .env.example .env.local
```

#### Docker

To run docker service, type:

```bash
$ pnpm run service:up
```

To stop docker service, type:

```bash
$ pnpm run service:down
```

To run MQTT5 you must edit the password, in the following way:

```bash
# show running docker container
$ docker ps

# login interactively into the mqtt container
$ docker exec -it <container-id-mqqt-service> sh

# Create new password file and add user and it will prompt for password
$ mosquitto_passwd -c /mosquitto/config/pwfile root

# exit
exit
```

## Running the app

#### App

```bash
# production
$ pnpm run start:prod

# watch local mode [env.local environment]
$ pnpm run watch

# watch development mode [env.development.local environment]
$ pnpm run watch:dev

# watch production mode [env.production.local environment]
$ pnpm run watch:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Stay in touch

- Author - [Rifky Sultan Karisma A](https://www.linkedin.com/in/rifkysultan/)
- Website - [https://trive.id](https://trive.id)

## License

Nest is [MIT licensed](LICENSE).
