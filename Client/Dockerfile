FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
  
ARG VITE_REACT_API_URL
ENV VITE_REACT_API_URL=$VITE_REACT_API_URL

RUN npm run build

EXPOSE 3000 

CMD ["npm","run","preview"]