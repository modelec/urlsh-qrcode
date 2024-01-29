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