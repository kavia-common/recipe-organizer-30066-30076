#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-organizer-30066-30076/recipe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

