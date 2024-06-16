#! /bin/sh
echo $GOOGLE_APPLICATION_CREDENTIALS > /app/service-account.json
yarn prisma migrate deploy
node dist/main.js
