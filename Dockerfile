FROM node:18.19-alpine3.18

WORKDIR /usr/src/app

COPY package.json package-lock.json server.js ./
RUN npm ci

# Copy .env file
COPY .env ./
CMD ["npm","start"]

