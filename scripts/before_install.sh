#!/bin/bash
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum update
sudo yum upgrade
sudo yum install epel-release
sudo yum install nodejs npm -y

# Clean working folder
# sudo find /home/ubuntu/nodejs -type f -delete