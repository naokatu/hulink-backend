FROM --platform=linux/x86_64 node:20.11.1-alpine3.19 AS deps
WORKDIR /app

COPY ../../package.json /app/package.json
COPY ../../yarn.lock /app/yarn.lock
RUN yarn install

FROM --platform=linux/x86_64 node:20.11.1-alpine3.19 AS builder
WORKDIR /app

COPY ../../. /app
COPY --from=deps /app/node_modules /app/node_modules

RUN yarn prisma generate
RUN yarn build

FROM --platform=linux/x86_64 node:20.11.1-alpine3.19 AS artifact

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY ../../prisma /app/prisma
COPY bootstrap.sh /app/bootstrap.sh

EXPOSE 80
CMD ["/app/bootstrap.sh"]
