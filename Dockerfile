FROM node:latest

WORKDIR /srv
EXPOSE 8080

COPY package*.json ./
RUN yarn install

# Would have needed cd if WORKDIR were not set
COPY . /srv

RUN yarn build
CMD ["yarn", "start"]