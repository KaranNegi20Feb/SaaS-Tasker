FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY prisma ./prisma
COPY tsconfig.json ./
COPY .env .env

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
