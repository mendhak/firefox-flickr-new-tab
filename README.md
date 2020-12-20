## Firefox - New Tab Replacement with Flickr Photos

This is a basic Firefox extension that replaces the New Tab in Firefox, and displays an image from a Flickr Photoset of your choice.  

You can change the Photoset ID in `about:addons` > Flickr Photos In New Tab > Preferences.  

The Addon page is at: https://addons.mozilla.org/en-GB/firefox/addon/mendhak-flickr-new-tab/




### Packaging

Zip up all needed files, but exclude git folder

```
zip -r -FS ../firefox-mendhak-flickr * --exclude '*.git*'
```
