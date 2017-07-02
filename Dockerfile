FROM ubuntu:14.04

MAINTAINER Stephen Pope, spope@projectricochet.com

RUN mkdir -p /home/meteorapp/meteorapp/app

WORKDIR /home/meteorapp

ADD . ./meteorapp

# Do basic updates
RUN apt-get update -q && apt-get clean

# Get curl in order to download curl
RUN apt-get install curl -y \

# Install Meteor
  && (curl https://install.meteor.com/ | sh) \

