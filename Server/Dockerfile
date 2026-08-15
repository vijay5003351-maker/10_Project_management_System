FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 4500

CMD ["npm","start"]