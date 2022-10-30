FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install express axios dotenv cors body-parser kafkajs avsc

COPY . .

EXPOSE 8000
CMD ["node","index.js"]