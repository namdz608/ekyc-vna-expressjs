FROM node:16.14-alpine
WORKDIR /app  
COPY package*.json ./
RUN npm install  
COPY . . 
EXPOSE 1337  
CMD [ "node", "server.js" ]