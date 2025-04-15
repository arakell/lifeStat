FROM node:22.14.0

COPY package-lock.json .
COPY package.json .
COPY .env .
RUN npm install

COPY /web_servs/ /web_servs/

CMD ["node", "controller.js"]