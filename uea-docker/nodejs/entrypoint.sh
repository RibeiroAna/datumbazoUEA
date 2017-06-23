#!/bin/bash
cd /app

# Generate https certificates
cd /app/ssl/ && bash generate-certificates.sh && cd /app

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

#Create database
echo "ALDONO UEA DATUMBAZO"
mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/novuea.mysql.sql

if [ -z "$TEST" ]; then
  bash /app/mysql/enigi.sh
  npm install --unsafe-perm --dev && nodemon
else
  npm install --unsafe-perm --dev &&  nodemon --ext js --watch ./ --exec 'mocha ./test || true' --delay 1
fi
