#!/usr/bin/env bash
# apply.sh
# Applies the database blueprint (schema.sql) to the running Postgres container.
# Run this whenever you add or change a table in db/schema.sql.
#
# Usage, from the project root:
#   bash db/apply.sh

# Stop immediately if anything fails, instead of continuing silently.
set -e

# Feed the contents of db/schema.sql into the database client inside the container.
#   docker exec      = run a command inside an already-running container
#   -i               = keep input open so the file can flow in
#   whodis-db        = the name of the Postgres container
#   psql             = Postgres's command-line client (lives inside the container)
#   -U postgres      = connect as the postgres user
#   -d whodis        = use the whodis database
#   < db/schema.sql  = pipe the blueprint file in as if you typed it yourself
docker exec -i whodis-db psql -U postgres -d whodis < db/schema.sql

# If we reach this line, the command above succeeded.
echo "Schema applied."