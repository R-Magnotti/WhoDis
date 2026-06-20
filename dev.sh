#!/usr/bin/env bash
# dev.sh
# Opens a shell inside an isolated Node container with this project mounted.
# Node and npm run in here, not on your machine, so your host secrets stay out of reach.
#
# Usage, from the project root:
#   bash dev.sh

docker run -it --rm -v "$(pwd):/app" -w /app node:22 bash