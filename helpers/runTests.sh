#!/bin/bash

# Script to run tests for the Algolia developer assignment
# Author: Praagya Joshi <praagya.joshi@gmail.com>

printf "\e[96m"
printf "\nRunning tests...\n"
printf "\e[0m"

docker exec -it praagya-algolia-backend bash -c "bundle exec rspec"
