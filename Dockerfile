FROM node:16

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./app
RUN cd /app \
    && yarn install --pure-lockfile
COPY . /app
EXPOSE 8080
CMD ["yarn", "start"]