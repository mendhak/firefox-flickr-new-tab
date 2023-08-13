## Firefox - New Tab Replacement with Flickr Photos

This is a basic Firefox extension that replaces the New Tab in Firefox, and displays an image from Flickr Explore, or a Flickr album of your choice.  

You can choose the Photoset ID, Flickr Explore, and Photo Sizes in `about:addons` > Flickr Photos In New Tab > Preferences.  

The Addon page is at: https://addons.mozilla.org/en-GB/firefox/addon/mendhak-flickr-new-tab/


### Microsoft Edge

The addon page is at: https://microsoftedge.microsoft.com/addons/detail/flickr-photos-in-new-tab/egfjehkbfaakmjnjkfgkkgpbadngnlff 



## Developing

In Firefox, open up `about:debugging` and click 'This Firefox'

Click 'Load Temporary Add-on...' and choose the `manifest.json` in this folder.





### Packaging

Zip up all needed files, but exclude git folder: 

```
zip -r -FS ../firefox-mendhak-flickr * --exclude '*.git*'
```

Then upload to the Developer Hub page and wait for approval. 