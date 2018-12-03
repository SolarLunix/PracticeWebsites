#!/bin/bash

# Pull from main branch
git pull

# Ensure everything is added and updated
git add README.md
git add git.sh
git add EnergonInc
git add LearnedData
git add KnockmoreStylesheet
git add ValtTec
git add QuaySideGrill

# Commit changes and upload to the master branch
git commit -m "Update" 
git push -u origin master

# Clear the console
clear