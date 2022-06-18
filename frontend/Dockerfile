FROM node:13.12.0-alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm install  
RUN npm install react-scripts@3.4.1 -g
COPY . ./
EXPOSE 3000