FROM node:boron

WORKDIR /usr/src/app
RUN npm install -g http-server

COPY . .

EXPOSE 8080
CMD ["http-server"]