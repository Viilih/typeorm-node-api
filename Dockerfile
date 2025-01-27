FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 8080

CMD ["node", "src/server.ts"]