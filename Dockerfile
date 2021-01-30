FROM node:14@sha256:04a33dac55af8d3170bffc91ca31fe8000b96ae1bab1a090deb920ca2ca2a38e

RUN apt update && apt install -y \
    libnss3-dev \
    libatk-bridge2.0-0 \
    libx11-xcb-dev \
    libgtk-3-dev \
    libasound2

WORKDIR /usr/src/app

ENTRYPOINT ["bash"]
