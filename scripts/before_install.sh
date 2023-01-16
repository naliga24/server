#!/bin/bash

# Install node.js and npm
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum update
sudo yum upgrade
sudo yum install epel-release
sudo yum install nodejs npm -y

# Install nodemon
# sudo npm install nodemon -g

# Install forever module 
# https://www.npmjs.com/package/forever
sudo npm install forever -g

# Clean working folder
# sudo find /home/ubuntu/nodejs -type f -delete