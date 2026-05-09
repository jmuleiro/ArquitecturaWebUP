FROM mariadb:lts-ubi

# Pass schema, MariaDB loads it on startup
COPY schema.sql /docker-entrypoint-initdb.d/schema.sql
