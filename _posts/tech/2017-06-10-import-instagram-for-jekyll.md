---
layout: post
title:  "Import/Adding Instagram posts to Jekyll"
date:   2017-06-24 17:12
categories: blog tech
tags: [script, blog, website, instagram]
published: true
description: "To integrate Instagram posts in to my website I created a small helper script that does the importing. In this post I'll explain how it works."
---

Most of my food projects are first published on Instagram. Some interesting ones I also post here with a full recipe. For this I required a fast and (most importantly) simple way to add Instagram posts to a Jekyll blog. For this I created a shell script that can automatically create Jekyll post drafts from published Instagram posts.

*Purely interested in the code?* The latest version of the code can be found in the [GitHub repository](https://github.com/wouterbulten/jekyll-instagram-importer).

## Retrieving post images from Instagram

Instagram has its own [API](https://www.instagram.com/de  veloper/) but for most things you will need to register as an application to get a API key. For a simple importer script this is to much hassle and it is debatable whether Instagram would accept such a case as an application. Luckily, the Instagram API also has an [embedding chapter](https://www.instagram.com/developer/embedding/) with calls that **don't require an API key**.  

The first endpoint is the ``media`` endpoint, useful to retrieve images of a specific post:

```
GET /p/{shortcode}/media/?size={size}
```

This endpoint returns an image based on the id/shortcode of the Instagram post. For example, retrieving the thumbnail of my [latest food project](https://www.instagram.com/p/BVAWwPXjE2b/) would result in the following call:

```
GET https://www.instagram.com/p/BVAWwPXjE2b/media/?size=t
```

My script imports the regular, large and small (thumbnail) image using *wget*:

```shell
wget --output-document="$imgDir/$fileName.jpg" "https://www.instagram.com/p/$post/media"
wget --output-document="$imgDir/${fileName}_large.jpg" "https://www.instagram.com/p/$post/media?size=l"
wget --output-document="$imgDir/${fileName}_thumbnail.jpg" "https://www.instagram.com/p/$post/media?size=t"
```

## Getting the post snippet

To embed the post itself we can use a snippet that Instagram provides. Unfortunately, this snippet is different for each post. We can however request this from the API. For this step we need a JSON parser for which I use [jq](https://stedolan.github.io/jq/). The endpoint for the snippet code is:

```
GET https://api.instagram.com/oembed/?url=http://instagr.am/p/{shortcode}
```

This call returns a JSON object containing the snippet, example:

```json
{
   "version":"1.0",
   "title":"Spring dessert: Lemon mousse with pistachio and ginger #food #desserts #platingfood #dessert #mousse #cooking  #dessertporn #foodporn #homemade",
   "author_name":"wouterbulten",
   "author_url":"https://www.instagram.com/wouterbulten",
   "author_id":4219314927,
   "media_id":"1531323945365294491_4219314927",
   "provider_name":"Instagram",
   "provider_url":"https://www.instagram.com",
   "type":"rich",
   "width":658,
   "height":null,
   "html":"\u003cblockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"7\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"\u003e\u003cdiv style=\"padding:8px;\"\u003e \u003cdiv style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;\"\u003e \u003cdiv style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"\u003e\u003c/div\u003e\u003c/div\u003e \u003cp style=\" margin:8px 0 0 0; padding:0 4px;\"\u003e \u003ca href=\"https://www.instagram.com/p/BVAWwPXjE2b/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\"\u003eSpring dessert: Lemon mousse with pistachio and ginger #food #desserts #platingfood #dessert #mousse #cooking  #dessertporn #foodporn #homemade\u003c/a\u003e\u003c/p\u003e \u003cp style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\"\u003eA post shared by Wouter Bulten (@wouterbulten) on \u003ctime style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-06-06T16:54:21+00:00\"\u003eJun 6, 2017 at 9:54am PDT\u003c/time\u003e\u003c/p\u003e\u003c/div\u003e\u003c/blockquote\u003e\n\u003cscript async defer src=\"//platform.instagram.com/en_US/embeds.js\"\u003e\u003c/script\u003e",
   "thumbnail_url":"https://scontent-amt2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18950105_2007839122778210_1395817508811833344_n.jpg",
   "thumbnail_width":640,
   "thumbnail_height":640
}
```

With jq we can retrieve only the relevant part of the object (jq must be on your path):

```shell
curl -s "https://api.instagram.com/oembed/?url=http://instagr.am/p/BVAWwPXjE2b" | jq -r '.html' 
```

## Tying everything together

To create a new Jekyll post the only step left is to create a correctly formatted Markdown file. My importer script asks for some basic info (ig post id, title, date, etc.) and then saves the images and the post file to the correct directories. The full script is shown below and can also be found on the [GitHub repository](https://github.com/wouterbulten/jekyll-instagram-importer).

In all, pretty simple but is saves a lot of time :) It could even be extended to extract the title and keywords and use these in Jekyll; that's something for the future though.


```bash
#!/bin/bash

echo "INSTAGRAM TO JEKYLL IMPORTER"

echo "[?] Which Instagram post would you like to import?"
read post

echo "[?] What is the title of your new post?"
read title

echo "[?] What should the publish date of the post be? (y-m-d)"
read date

echo "[?] Where should the post be saved?"
read postDir

echo "[?] Where should the images be saved?"
read imgDir

# Format filename
fileName=$(echo "$date-$title" | iconv -t ascii//TRANSLIT | sed -E s/[^a-zA-Z0-9]+/-/g | sed -E s/^-+\|-+$//g | tr A-Z a-z)
path="$postDir/$fileName.md"

# Show confirmation on screen
echo "Starting import"
echo "--> importing post with id '$post'"
echo "--> output file: $fileName.md"

# Download the images
echo "--> import images"
wget --output-document="$imgDir/$fileName.jpg" "https://www.instagram.com/p/$post/media"
wget --output-document="$imgDir/${fileName}_large.jpg" "https://www.instagram.com/p/$post/media?size=l"
wget --output-document="$imgDir/${fileName}_thumbnail.jpg" "https://www.instagram.com/p/$post/media?size=t"

# Output markdown file
content="---
layout: post
title:  '$title'
date:   $date
instagram_id: $ost
tags: []
post_image: $imgDir/$fileName.jpg
post_image_large: $imgDir/${fileName}_large.jpg
post_image_small: $imgDir/${fileName}_thumbnail.jpg
---

<!-- begin ig snippet -->"
echo "$content" >> "$path"

# Download IG snippet
curl -s "https://api.instagram.com/oembed/?url=http://instagr.am/p/$post" | jq -r '.html' >> "$path"
echo "<!-- end ig snippet -->" >> "$path"

echo "IMPORT COMPLETE"
```
