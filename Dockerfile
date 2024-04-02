FROM oven/bun:alpine

LABEL maintainer="BreizhHardware"

# Add your application files
ADD .env /app/.env
ADD prisma /app/prisma
ADD bun.lockb /app/bun.lockb
ADD index.ts /app/index.ts
ADD noDb.ts /app/noDb.ts
ADD package-lock.json /app/package-lock.json
ADD package.json /app/package.json
ADD tsconfig.json /app/tsconfig.json

# Change directory and run bun commands
WORKDIR /app
RUN bun install
CMD ["bun", "dev"]

EXPOSE 8080
