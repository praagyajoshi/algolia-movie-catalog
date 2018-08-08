#!/bin/bash

# Setup script for Algolia developer assignment
# Author: Praagya Joshi <praagya.joshi@gmail.com>

# Prints text with colour based on the message's importance level
print_text () {
  if [ "$2" == "info" ]
  then
      COLOR="96m"
  elif [ "$2" == "success" ]
  then
      COLOR="92m"
  elif [ "$2" == "warning" ]
  then
      COLOR="93m"
  elif [ "$2" == "danger" ]
  then
      COLOR="91m"
  else
      COLOR="0m"
  fi

  STARTCOLOR="\e[$COLOR"
  ENDCOLOR="\e[0m"

  printf "$STARTCOLOR%b$ENDCOLOR$ENDCHARACTER" "$1";
}

# Exits the script after printing out an error message
exit_with_error () {
  print_text "$1\n" "danger"
  exit 1
}

print_text "Welcome to the Algolia assignment setup!\n" "success"
printf "\n"

printf "\e[96m"
cat "./algolia"
printf "\e[0m"

printf "\n"

# Confirm that docker is installed
docker --version || { exit_with_error "Docker is not installed! Aborting."; }
print_text "Docker check: "
print_text "OK\n" "success"

printf "\n"

# Confirm that docker-compose is installed
docker-compose --version || { exit_with_error "Docker Compose is not installed! Aborting."; }
print_text "Docker Compose check: "
print_text "OK\n" "success"

printf "\n"

# Confirm that the frontend .env file exists
if [ ! -f "./frontend/.env" ]
then
  exit_with_error "Frontend .env not found! Aborting."
  print_text "Please create the .env from .env.sample in frontend/ \n" "info"
else
  print_text "Frontend .env check: "
  print_text "OK\n" "success"
fi

# Confirm that the backend .env file exists
if [ ! -f "./backend/.env" ]
then
  exit_with_error "Backend .env not found! Aborting."
  print_text "\nPlease create the .env from .env.sample in backend/ \n" "info"
else
  print_text "Backend .env check: "
  print_text "OK\n" "success"
fi

printf "\n"

# Pull the docker container images
print_text "Pulling docker container images\n" "info"
docker-compose pull

printf "\n"

# Build the images and start the containers
print_text "Building and starting the containers\n" "info"
docker-compose up --build -d

printf "\n"

# Wait for a little while for the containers to start
print_text "Waiting for the containers to start\n" "info"
sleep 5

# Confirm that the Mongo container is ready
while ! curl -s localhost:27017 > /dev/null
do
    print_text "Waiting for the Mongo container to be responsive\n" "info"
    sleep 5
done

printf "\n"

# Use mongoimport to import the initial data set
print_text "Creating the DB schema:\n" "info"
docker exec -it praagya-algolia-mongo bash -c 'mongoimport --username root --password algolia --authenticationDatabase admin --db backend_development --collection movies --file seed_data/movies.json --jsonArray'
print_text "\nOK\n" "success"

printf "\n"

# Run a rake task to index all the imported data with Algolia
print_text "Indexing the data with Algolia:" "info"
docker exec -it praagya-algolia-backend bash -c 'rails movies:reindex'
print_text " OK\n" "success"

printf "\n"

# Great success!
print_text "Done!\n" "success"
print_text "API service running on: " "info"
print_text "http://localhost:8080/api\n" "success"
print_text "Frontend app running on: " "info"
print_text "http://localhost:8080\n" "success"
print_text "Mongo DB running on: " "info"
print_text "http://localhost:27017\n" "success"
print_text "Mongo express running on: " "info"
print_text "http://localhost:8081\n" "success"

printf "\n"

print_text "Opening the app..." "success"
open "http://localhost:8080"

printf "\n"
