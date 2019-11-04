FROM node:alpine

COPY . .

WORKDIR audit-log-cli

RUN npm install

ENTRYPOINT ["npm", "-s", "start", "--"]