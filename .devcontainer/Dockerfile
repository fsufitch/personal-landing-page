FROM fedora:37

### System dependencies

RUN dnf install -y \
    bash-completion \
    curl \
    file \
    git \
    gnupg2 \
    hostname \
    iputils \
    man-db \
    ncurses \
    openssh openssh-clients openssh-server \
    python3 \
    protobuf-compiler \
    sudo \
    vim \
    wget \
    xz    

RUN dnf groupinstall -y \
    "Development Tools" \
    "Development Libraries"

### Nodejs for development

WORKDIR /opt
COPY ./node-url.sh .
RUN NODE_URL="$(bash ./node-url.sh)" && \
    curl -O "$NODE_URL" && \
    tar xf node-*.tar.* && \
    rm node-*.tar.* && \
    ln -s node-*/ node

# Extra bashrc, paths, etc
COPY ./bashrc-load-dir.sh /etc/bashrc-load-dir.sh
COPY ./bashrc.d /etc/.bashrc.d
RUN printf '\n\
    if [ -d /etc/.bashrc.d ]; then\n\
    for rc in /etc/.bashrc.d/*; do\n\
    if [ -f "$rc" ]; then\n\
    . "$rc"\n\
    fi\n\
    done\n\
    fi\n\
    \n' >> /etc/bashrc

# Set up 'developer' user, no password, with sudo
RUN useradd -m -G wheel developer
RUN printf '\n\ndeveloper ALL=(ALL) NOPASSWD: ALL\n' >> /etc/sudoers
RUN chown developer:developer -R /home/developer
USER developer
