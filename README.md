## Firefox Extension for Mendhak Photos

This is a basic Firefox extension that replaces the New Tab in Firefox, and displays an image from [my Flickr photostream](https://www.flickr.com/photos/mendhak/). 

Addon page is at: https://addons.mozilla.org/en-GB/firefox/addon/mendhak-flickr-new-tab/


### Packaging

Zip up all needed files, but exclude git folder

```
zip -r -FS ../firefox-mendhak-flickr * --exclude '*.git*'
```
