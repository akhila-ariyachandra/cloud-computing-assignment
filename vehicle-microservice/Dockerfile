FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY .env ./env

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Files required by pnpm install
COPY package.json package-lock.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY .env ./env

RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3003
CMD ["node", "dist/main"]