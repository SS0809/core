FROM node:18.19-alpine3.18

WORKDIR /usr/src/app

COPY . ./

RUN npm install


CMD ["npm","start"]

