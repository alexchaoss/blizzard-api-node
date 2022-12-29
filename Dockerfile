FROM node:16
WORKDIR /app 
COPY . /app
RUN yarn
RUN yarn build 
CMD node bin/blizzportal-api.js
EXPOSE 8000