#! /bin/sh
echo $GOOGLE_APPPLICATION_CREDENTIALS > /app/service-account.json
yarn prisma migrate deploy
node dist/main.js
