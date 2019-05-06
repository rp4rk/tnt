FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --production
COPY . ./

CMD [ "npm", "start" ]