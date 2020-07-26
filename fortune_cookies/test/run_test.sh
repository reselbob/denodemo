#!/bin/bash
. ./export.bash

#Make it soe the deno can access the network, env var and do file-system read/write
deno test  --allow-net --allow-env --allow-read --allow-write --reload
