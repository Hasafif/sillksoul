#!/bin/bash
set -e

echo "Deployment started2..."


# Pull the latest version of the app
git fetch origin master
git reset --hard origin/master
git clean -fd
echo "New changes copied to server !"
# Clean old dependencies
rm -rf node_modules
rm -f package-lock.json
echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "Deployment Finished!"
