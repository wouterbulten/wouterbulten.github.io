#!/bin/bash

echo "Name of post"
read title
echo "Date of post (y-m-d)"
read date

echo "IG"
read ig

fileName=$(echo "$date-$title" | iconv -t ascii//TRANSLIT | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z)
path="../_posts/recipes/$fileName.md"

wget --output-document="../assets/images/food/$fileName.jpg" "https://www.instagram.com/p/$ig/media"
wget --output-document="../assets/images/food/${fileName}_large.jpg" "https://www.instagram.com/p/$ig/media?size=l"
wget --output-document="../assets/images/food/${fileName}_thumbnail.jpg" "https://www.instagram.com/p/$ig/media?size=t"

content="---
layout: post
title:  '$title'
date:   $date
categories: blog food
ig: $ig
tags: []
post_image: /assets/images/food/$fileName.jpg
post_image_large: /assets/images/food/${fileName}_large.jpg
post_image_small: /assets/images/food/${fileName}_thumbnail.jpg
---

<!-- begin ig snippet -->
"

echo "$content" >> "$path"

# Download IG snippet
curl -s "https://api.instagram.com/oembed/?url=http://instagr.am/p/$ig" | ./jq -r '.html' >> "$path"
echo "<!-- end ig snippet -->" >> "$path"
