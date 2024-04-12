FROM oven/bun:alpine

LABEL maintainer="BreizhHardware"

# Add your application files
ADD .env /app/.env
ADD index.ts /app/index.ts
ADD noDb.ts /app/noDb.ts
ADD package.json /app/package.json
ADD tsconfig.json /app/tsconfig.json
ADD bun.lockb /app/bun.lock

# Change directory and run bun commands
WORKDIR /app
RUN bun install

EXPOSE 8080
CMD ["bun", "dev:db"]
