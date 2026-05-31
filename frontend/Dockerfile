FROM node:26-alpine

WORKDIR /app

ENV PORT=3001

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "start"]