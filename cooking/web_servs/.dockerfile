FROM node:22.14.0

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install

COPY cooking/web_servs/ cooking/web_servs/

CMD ["node", "controller.js"]