#!/bin/bash

# Clean environment
if [ -f ./tmp/pids/server.pid ]; then
  echo -e "\nCleaning environment"
  rm tmp/pids/server.pid
fi

# Install dependencies
echo -e "\nChecking gems"
bundle install

# Run!
echo -e "\nRunning server"
exec "$@"
