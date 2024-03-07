#!/bin/bash

cd /home/techcoordi/noticeboard/scripts/ || exit 1
git pull origin main
sudo docker build -t proffapt/noticeboard .
sudo docker-compose down
sudo docker-compose up -d
