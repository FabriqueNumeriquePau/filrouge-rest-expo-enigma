FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
USER node
COPY . .
EXPOSE 3000
