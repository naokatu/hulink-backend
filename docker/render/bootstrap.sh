#! /bin/sh
yarn prisma migrate deploy
node dist/main.js
