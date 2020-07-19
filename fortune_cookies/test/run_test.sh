#!/bin/bash
. ./export.bash

deno test  --allow-net --allow-env --allow-read --allow-write --reload