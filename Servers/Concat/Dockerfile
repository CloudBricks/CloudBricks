FROM node:boron

WORKDIR /usr/src/app

COPY ./package.json ./package.json
RUN npm install

COPY ./index.js ./index.js

EXPOSE 8080
CMD ["npm", "start"]

