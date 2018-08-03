#!/bin/bash

# Clean environment
if [ -f ./tmp/pids/server.pid ]; then
  echo -e "\nCleaning environment"
  rm tmp/pids/server.pid
fi

# Validate dependencies
echo -e "\nChecking gems"
bundle install

# Execute the commands specified along with this entry point
echo -e "\nRunning server"
exec "$@"
