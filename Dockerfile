FROM node:14 as builder

WORKDIR /app

COPY package.json . 

RUN yarn

COPY . .

RUN yarn build

ENV PORT 3000 

EXPOSE ${PORT}

RUN rm -rf ./node_modules

RUN yarn --prod

# ----------------------
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules

COPY --from=builder /app/dist /app/dist/src

CMD node dist/src/main