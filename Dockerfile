FROM node

WORKDIR /api

COPY package*.json /api/ 

RUN npm i

COPY . .

CMD [ "npm", "run", "start:prod"]