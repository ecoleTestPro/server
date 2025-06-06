#!/bin/bash

# Start the Laravel development server
gnome-terminal -- bash -c "php artisan serve"

# Start the npm development server
gnome-terminal -- bash -c "npm run dev"

# Wait for both processes to finish
# wait