#!/bin/bash

# Sample execution command: $: ./script.sh php main.php

complier=$1
file=$2
output=$3

START=$(date +%s.%4N)

if [ $complier == "g++" ]
then
    $complier -o Main $file
    ./Main > $output
else
    $complier $file > $output
fi
END=$(date +%s.%4N)
runtime=$(echo "$END - $START" | bc)

echo $runtime