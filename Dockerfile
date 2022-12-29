FROM node:16
WORKDIR /app 
COPY package.json /app 
COPY yarn.lock /app
RUN yarn build 
COPY ./bin/blizzportal-api.js /app 
CMD node blizzportal-api.js
EXPOSE 8000