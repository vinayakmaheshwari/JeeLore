FROM oven/bun:1.1.0

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install

COPY backend ./backend

EXPOSE 2000

CMD ["bun", "backend/server.js"]
