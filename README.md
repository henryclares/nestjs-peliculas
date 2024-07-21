<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
Backend Peliculas - NestJS
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Base de datos

Base de datos PostgreSQL

```bash
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
```

## Varables de entorno

Crea un archivo `.env`

```bash
touch .env
```

Agrega las siguientes variables de entorno:

```bash
# Datos de despliegue
NODE_ENV=development
PORT=4000

# Configuración de la base de datos
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=db_peliculas
DB_PORT=5432

#JWT
JWT_SECRET=secret
JWT_EXPIRES_IN=9000000

# OMDB
OMDB_API_KEY=
OMDB_URL=https://www.omdbapi.com
```

> [!NOTE]
> La variable _OMDB_API_KEY_ es la clave de acceso para la API de OMDB la puedes encontrar en la [API de OMDB](https://www.omdbapi.com/apikey.aspx).

## Instalacion

```bash
npm install

npm run setup
```

## Levantar el backend

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
