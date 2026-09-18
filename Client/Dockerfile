# FROM node:24-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# ARG VITE_REACT_API_URL
# ENV VITE_REACT_API_URL=$VITE_REACT_API_URL

# RUN npm run build

# EXPOSE 3000 

# CMD ["npm","run","preview"]

# multi stage 

FROM node:24-alpine AS build 

WORKDIR  /app

COPY package*.json .

RUN npm ci

COPY . .
ARG VITE_REACT_API_URL=/api
ENV VITE_REACT_API_URL=$VITE_REACT_API_URL

RUN npm run build


# run the stage 
FROM node:24-alpine
WORKDIR  /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve","-s","dist","-l","3000"]