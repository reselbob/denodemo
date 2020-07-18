#!/bin/bash
cd ..

docker build -t mydenoserver .
docker run -d --name simplecalc -p 7700:7700 mydenoserver

deno test  --allow-net --allow-env --allow-read --allow-write --reload

docker rm -f simplecalc
docker rmi -f mydenoserver