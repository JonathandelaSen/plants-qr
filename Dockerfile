FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . .
EXPOSE 3002
CMD [ "npm", "run", "dev:plants" ]
