# Instalacion

## Node

Antes de continuar con la instalación del proyecto, es necesario que ya se hayan realizado las siguientes instalaciones:

1. [NodeJS](https://github.com/nodesource/distributions/blob/master/README.md): Versión 20
2. [NVM](https://github.com/nvm-sh/nvm) Se recomienda NVM solo para ambientes de DESARROLLO.
   El proyecto esta desarrollado con [Node 20](https://nodejs.org/en/)

## Base de datos

Base de datos PostgreSQL

```bash
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
```

Luego crea una base de datos llamada `db_peliculas`

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

## Instalacion de dependencias

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
