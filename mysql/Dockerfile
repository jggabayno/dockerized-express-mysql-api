FROM mysql:8.0.35
WORKDIR /dem
ADD ./dem /dem/
COPY /dem/recreate_db.sql /docker-entrypoint-recreate_db.d/
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]