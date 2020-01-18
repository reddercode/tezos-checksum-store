FROM node:alpine

WORKDIR /audit-log-cli

COPY . .

RUN npm install

ENTRYPOINT ["npm", "-s", "start", "--"]
