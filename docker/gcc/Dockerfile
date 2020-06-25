FROM gcc:latest

MAINTAINER trinhthinh<trinhthinh388@gmail.com>

RUN apt-get update && apt-get install -y bc

WORKDIR /home/cc

ADD script.sh /bin/script.sh
RUN chmod +x /bin/script.sh

ENTRYPOINT [ "bash", "/bin/script.sh" ]