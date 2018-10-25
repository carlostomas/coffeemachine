FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -D .

EXPOSE 3000

CMD ["npm", "start"]
