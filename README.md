# $aspirity_restmock

## Development

### Basic installation and setup [here](https://github.com/aspirity-ru/mam_aspirity)

### How to start app server
1. Run database
```bash
cd ./mam/aspirity/restmock
docker-compose up -d postgres pgadmin
```

2. Run app server in docker
```bash
cd ./mam/aspirity/restmock
docker-compose up restmock
```

websocket is exposed on the port 3000

http endpoint for sending requests is on the port 3001

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
