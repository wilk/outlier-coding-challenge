FROM node:13.1.0-alpine

USER root
RUN addgroup -S outlier && adduser -S outlier -G outlier
USER outlier

WORKDIR /home/outlier
COPY package.json .
COPY tsconfig.json .
COPY src .
RUN npm i
CMD [ "node", "dist/index.js" ]
