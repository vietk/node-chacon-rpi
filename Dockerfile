FROM node:latest
MAINTAINER Kevin Viet <kevin.viet@gmail.com>

RUN mkdir -p /usr
WORKDIR /app
COPY . /app

EXPOSE 8080
RUN npm install
CMD ["npm", "start"]