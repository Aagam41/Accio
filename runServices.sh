#!/bin/bash
BASE_DIR="$HOME/Development/Accio"

# Chaning to BASE_DIR for safety
cd $BASE_DIR

# Python virtual environment
source "$BASE_DIR/venv/bin/activate"

# Accio react application
echo 'Starting Accio ReactJs Application on localhost:3000'
cd "$BASE_DIR/accio/client/accio"
npm start -- -a localhost --port 3000 &

# Authentication django service
echo 'Starting Authentication Django Service on localhost:8000'
cd "$BASE_DIR/accio/authentication"
python3 manage.py runserver localhost:8000 &

# Document Storage django service
echo 'Starting Document Storage Django Service on localhost:8001'
cd "$BASE_DIR/accio/document_storage"
python3 manage.py runserver localhost:8001 &

# Chaning to BASE_DIR for returning terminal back to its original location
cd $BASE_DIR
