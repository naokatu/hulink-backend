#! /bin/sh
echo $GOOGLE_APPLICATION_CREDENTIALS_CONTENT > /app/service-account.json
node dist/main.js
