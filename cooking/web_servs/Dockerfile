FROM node:22.14.0

COPY ../cooking/package-lock.json/ .
COPY ../cooking/package.json/ .
COPY ../cooking/.evn/ .
RUN npm install

COPY . /web_servs/

CMD ["node", "controller.js"]