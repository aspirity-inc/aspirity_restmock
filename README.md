# $aspirity_restmock

## Development

### Basic installation and setup [here](https://github.com/aspirity-ru/mam_aspirity)

### How to start app server
1. Run database

```bash
cd ./mam/aspirity/restmock
docker-compose up
```
2. Run app server

```bash
cd ./mam/aspirity/restmock
PORT="3000" DATABASE_URL="postgres://postgres:changeme@localhost:5432/app" node ./-/node.js --start
```

3. For debug app server use `nodemon`

```bash
cd ./mam/aspirity/restmock && nodemon
```

### How to clear database
1. Open `http://localhost:5050/browser/`
2. Credentials see in `docker-compose.yml`
3. Clear `store` table
```SQL
DELETE from public.store
```
4. Clear local storage in browser
5. Restart app server
6. Reload browser tab
