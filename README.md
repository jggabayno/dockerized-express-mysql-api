# Dockerized Express and MySQL API

## Overview

A Dockerized Express API with MySQL, authentication (JWT), user management, logging, validation, customizable schema, schema initialization, seeding, and dependency inversion (Clean Architecture).


## Getting started

### Requirements
- Docker Desktop (`Engine` 4.25.2)

### Build the images 

```
docker compose build mysql bend
```

### Build the images (without cache)

```
docker compose build --no-cache mysql bend
```

### Run Containers

**Start all services:**
```
docker compose up
```

**Start only the backend:**
```
docker compose up bend
```

**Start only MySQL:**
```
docker compose up dem_mysql_cont
```

**NOTE:**
- If `docker compose up` fails, ensure .env files and dependencies are properly configured.
- `CTRL+C` to terminate running container

## Ops

### Connect to MySQL

- Using the host's MySQL client:
```
mysql -u dem -D dem -p -h 127.0.0.1 -P 6633
```

- Using the MySQL container:
```
docker exec -it dem_mysql_cont /bin/bash

mysql -u dem -D dem -p -h 127.0.0.1 
```

Use password from `.env` file.

### Connect to Backend container (bend)
```
docker exec -it dem_bend_cont /bin/bash
```

NOTE: You can do your local migration here


## Form Validation Rules

For details on how validation rules are stored and structured, refer to `docs/validation-rules.md`.