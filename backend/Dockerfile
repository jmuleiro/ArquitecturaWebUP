FROM node:26-alpine

WORKDIR /app

ENV PORT=3000

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["node", "dist/main"]
