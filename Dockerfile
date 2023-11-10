FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY nest-cli.json .
COPY .env . 
COPY tsconfig.build.json . 
COPY tsconfig.json .
COPY yarn.lock .
 
RUN yarn install

COPY prisma prisma
COPY src src

RUN yarn build

RUN npx prisma generate

CMD ["yarn", "start:prod"]

EXPOSE 3100


