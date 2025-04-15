FROM node:22.14.0

COPY /cooking/package-lock.json /cooking/package-lock.json
COPY /cooking/package.json /cooking/package.json
RUN npm install

COPY /cooking/web_servs/ /cooking/web_servs/

CMD ["node", "controller.js"]