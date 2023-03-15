FROM node:19.7.0

WORKDIR /usr/src/app
COPY . .

RUN npm install

EXPOSE 8080
CMD [ "node", "main.js" ]