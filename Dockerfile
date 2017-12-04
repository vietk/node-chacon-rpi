FROM hypriot/rpi-node:6.10.0
MAINTAINER Kevin Viet <kevin.viet@gmail.com>

RUN apt-get update && apt-get install -y -q \
    git \
    make \
    gcc \
    python \
    g++ \ 
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr
WORKDIR /app
COPY package.json /app
RUN npm install
COPY app.js /app
COPY chaconEmitter.js /app

EXPOSE 8080
CMD ["npm", "start"]
