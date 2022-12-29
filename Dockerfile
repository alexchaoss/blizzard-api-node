FROM node:16
WORKDIR /app 
COPY package.json /app 
COPY yarn.lock /app
RUN yarn build 
COPY . /app 
CMD node bin/blizzportal-api.js
EXPOSE 8000