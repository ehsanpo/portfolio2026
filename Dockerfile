FROM caddy:alpine

WORKDIR /srv
COPY dist/ /srv
COPY Caddyfile /srv/Caddyfile

EXPOSE 8080
CMD ["caddy", "run", "--config", "/srv/Caddyfile"]
