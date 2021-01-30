#!/usr/bin/env bash

set -euxo pipefail

docker_image_name=pocketcasts-electron

export DOCKER_BUILDKIT=1

docker build . -t $docker_image_name

docker run \
  -ti \
  -u "$(id -u):$(id -g)" \
  -v "$PWD":/usr/src/app \
  $docker_image_name
