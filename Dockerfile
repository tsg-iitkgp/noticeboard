FROM nginx:alpine

COPY . /usr/share/nginx/html

RUN mkdir -p /usr/share/nginx/html/notices && \
    chmod -R 755 /usr/share/nginx/html/notices

WORKDIR /usr/share/nginx/html