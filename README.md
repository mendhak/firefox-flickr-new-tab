## Firefox Extension for Mendhak Photos

This is a basic [Firefox extension](https://addons.mozilla.org/en-GB/firefox/addon/mendhak-flickr-new-tab/) that replaces the New Tab in Firefox, and displays an image from [my Flickr photostream](https://www.flickr.com/photos/mendhak/)


### Packaging

Zip up all needed files, but exclude git folder

```
zip -r -FS ../firefox-mendhak-flickr * --exclude '*.git*'
```