#!/bin/bash 
# APP_NAME=web
# APP_DOMAIN=localhost
# APP_PORT=3000
# SETTINGS_PATH=./settings-production.json
# MONGO_URL=localhost
# MONGO_PORT=27017
# MONGO_DB=myappdb

# echo "=> Removing /tmp/${APP_NAME}"
# rm -R C:\Github\webbundle
# echo "=> Executing Meteor Build…"

# exec meteor build C:\Github\C:\Github\webbundle --architecture os.linux.x86_64

# exit

# echo "=> Copying settings file"
# cp ${SETTINGS_PATH} /tmp/${APP_NAME}/bundle/settings.json
# echo "=> Creating package.json…"
# cat > package.json <<- "EOF"
# {   "name": "senseweb",   "version": "1.0.0",   "scripts": {     "start": "METEOR_SETTINGS=$(cat settings.json) node main.js"   } }
# # EOF

# echo "=> Creating Dockerfile…"
# cat > Dockerfile <<EOF
# # Pull base image.
# FROM mhart/alpine-node:4
# # Install build tools to compile native npm modules
# RUN apk add — update build-base python
# # Create app directory
# RUN mkdir -p /usr/app
# COPY . /usr/app
# RUN cd /usr/app/programs/server && npm install — production
# WORKDIR /usr/app
# ENV PORT=3000
# ENV MONGO_URL=mongodb://$MONGO_URL:$MONGO_PORT/$MONGO_DB
# ENV ROOT_URL=http://$APP_DOMAIN:$APP_PORT/
# CMD [ "npm", "start" ]
# EXPOSE 3000
# EOF

echo "=> Building docker image…"
docker stop senseweb
docker rm -f senseweb
docker rmi -f senseweb

# Once everything is out of the way we can build the image
docker build -t senseweb .

exit
echo "=> Starting ${APP_NAME} container…"
docker run -d — name ${APP_NAME} -p ${APP_PORT}:3000 ${APP_NAME}
