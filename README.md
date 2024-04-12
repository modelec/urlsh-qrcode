# urlsh-api-modelec

To install dependencies:

```bash
bun install
```
  
fill example.env and rename it to .env  

If you want to use database with prisma  
  
```bash
bun prisma:migrate:dev
bun dev:db
```
  
else 
  
```bash
bun dev
```

Or you can use docker-compose to run the project

```yaml
version: '3.8'

services:
    urlsh-api-modelec:
        image: breizhhardware/modelec-urlsh-qrcode:latest
        container_name: urlsh-api-modelec
        ports:
            - "8080:8080"
```

```bash
docker-compose up -d
```