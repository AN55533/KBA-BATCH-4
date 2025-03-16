FROM node:20.15.1
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
CMD ["npm","run","dev","--host"]
