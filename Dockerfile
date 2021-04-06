FROM node:15.4.0-alpine3.10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

EXPOSE $PORT

CMD [ "node", "index.js" ]
