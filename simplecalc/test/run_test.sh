#!/bin/bash
docker build -t mydenoserver ../Dockerfile
docker run -d --name simplecalc -p 7700:7700 mydenoserver

deno test  --allow-net --allow-env --allow-read --allow-write --reload

docker rm -f simplecalc
docker rmi -f mydenoserver