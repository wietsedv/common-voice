FROM node:18-bullseye

RUN apt-get update && \
    apt-get install python3-pip vim -y && \
    pip3 install --upgrade setuptools==68.2.2

# Installed as root so it lands in /usr/local (world-readable) rather than
# /home/node/.local, which is mode 700 and owned by the image's `node` user.
# The container runs as an arbitrary host UID (see `user:` in docker-compose),
# so anything under /home/node is unreadable at runtime.
RUN git clone --depth 1 -b release-v1.3.0 https://github.com/common-voice/CorporaCreator.git && \
    cd CorporaCreator && \
    pip3 install . && \
    cd .. && rm -rf CorporaCreator

RUN groupmod -g 10001 node && usermod -u 10001 -g 10001 node

RUN mkdir /cache && chmod 777 /cache

USER node

RUN mkdir -p /home/node/code

WORKDIR /home/node

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN git clone --depth 1 -b release-v1.0.0 https://github.com/common-voice/mp3-duration-reporter.git
RUN cd mp3-duration-reporter && /home/node/.cargo/bin/cargo install --path .

ENV PATH "$PATH:/home/node/.cargo/bin"
ENV npm_config_cache "/home/node/"

WORKDIR /home/node/code

COPY --chown=node ./package.json ./
COPY --chown=node ./package-lock.json ./

# Install dependencies
RUN npm ci

COPY --chown=node ./ ./

RUN npm run build

CMD ["npm", "run", "start"]
