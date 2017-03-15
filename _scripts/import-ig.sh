#!/bin/bash

echo "Name of post"
read title
date=`date +%Y-%m-%d`

echo "IG"
read ig

fileName=$(echo "$date-$title" | iconv -t ascii//TRANSLIT | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z)
path="../_posts/recipes/$fileName.md"

wget --output-document="../assets/images/food/$fileName.jpg" "https://www.instagram.com/p/$ig/media"
wget --output-document="../assets/images/food/${fileName}_large.jpg" "https://www.instagram.com/p/$ig/media?size=l"

content="---
layout: post
title:  '$title'
date:   $date
categories: blog food
tags: []
post_image: /assets/images/food/$fileName.jpg
post_image_large: /assets/images/food/${fileName}_large.jpg
---
"

echo "$content" >> "$path"
