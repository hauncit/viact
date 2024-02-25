FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env_example .env

EXPOSE 3000

CMD ["npm", "run", "start"]
