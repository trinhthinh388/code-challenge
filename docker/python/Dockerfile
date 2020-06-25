FROM python:3.8.3-alpine3.12

MAINTAINER trinhthinh<trinhthinh388@gmail.com>

RUN apk add --no-cache bc
RUN apk add --update coreutils && rm -rf /var/cache/apk/*

WORKDIR /home/cc

ADD script.sh /bin/script.sh
RUN chmod +x /bin/script.sh

ENTRYPOINT ["sh", "/bin/script.sh"]