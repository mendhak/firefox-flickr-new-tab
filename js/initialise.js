

getImageFromPhotoset = function(flickrsetid, preferredSize) {
    api_key='ce627966d2544e939f0306fcbfd919ce';
    set_id=flickrsetid;
    
    
    var flickrURL =  'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&extras=url_k,url_3k,url_4k,url_5k,url_6k&api_key=' 
                        + api_key 
                        + '&photoset_id=' + set_id 
                        + '&per_page=100' 
                        + '&sort=date-posted-desc&format=json&nojsoncallback=1';
        
    fetch(flickrURL)
      .then(response => response.json())
      .then(data => {
          let img = findSuitableImage(data.photoset,preferredSize)
          let photoLink = "https://www.flickr.com/photos/" + data.photoset.owner  + "/" + img.id + "/";
          document.getElementById("theimage").setAttribute("src", img[`url_${preferredSize}`]);
          document.getElementById("thelink").setAttribute("href", photoLink);
      }); 

}

findSuitableImage = function(photos, preferredSize) {
    let urlProp = `url_${preferredSize}`, widthProp = `width_${preferredSize}`, heightProp = `height_${preferredSize}`;

    // Pick a random image, preferred size, landscape orientation.
    let filteredArray = photos.photo.filter(i => i[urlProp] && i[widthProp]>i[heightProp]);
    let img = filteredArray[Math.floor(Math.random() * filteredArray.length)];
    console.log(img);
    return img;
}

getImageFromExplore = function(preferredSize) {
    api_key='ce627966d2544e939f0306fcbfd919ce';

    var flickrURL = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&extras=url_k,url_3k,url_4k,url_5k,url_6k'
                    + '&api_key=' + api_key 
                    + '&per_page=50'
                    + '&orientation=landscape'  //undocumented
                    + '&dimension_search_mode=min&height=1080&width=1920' //undocumented
                    + '&advanced=1' //undocumented
                    + '&media=photos' //undocumented
                    + '&format=json&nojsoncallback=1';
    
    fetch(flickrURL)
      .then(response => response.json())
      .then(data => {
          let img = findSuitableImage(data.photos, preferredSize);
          let photoLink = "https://www.flickr.com/photos/" + img.owner  + "/" + img.id + "/";
          document.getElementById("theimage").setAttribute("src", img[`url_${preferredSize}`]);
          document.getElementById("thelink").setAttribute("href", photoLink);
      }); 

}

getImageFromTextSearch = function(text, preferredSize) {
    api_key='ce627966d2544e939f0306fcbfd919ce';

    var flickrURL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&extras=url_k,url_3k,url_4k,url_5k,url_6k'
                    + '&text=' + text
                    + '&api_key=' + api_key 
                    + '&orientation=landscape'  //undocumented
                    + '&dimension_search_mode=min&height=1024&width=1024' //undocumented
                    + '&advanced=1' //undocumented
                    + '&media=photos' //undocumented
                    + '&per_page=50'
                    + '&sort=interestingness-desc'
                    // + '&sort=relevance'
                    + '&format=json&nojsoncallback=1';

  
    fetch(flickrURL)
      .then(response => response.json())
      .then(data => {
          let img = findSuitableImage(data.photos, preferredSize);
          if(!img){
              console.warn("Flickr Photo In New Tab extension - No suitable image found to display. Try selecting different sizes, or different search terms.");
              return;
          }
          let photoLink = "https://www.flickr.com/photos/" + img.owner  + "/" + img.id + "/";
          document.getElementById("theimage").setAttribute("src", img[`url_${preferredSize}`]);
          document.getElementById("thelink").setAttribute("href", photoLink);
      }); 

}



function onError(error) {
    console.log(`Error: ${error}`);
}

function onReceived(item) {
    console.log(item);

    let flickrsetid = item.flickrsetid || "72157716222153076";
    let flickrTextSearch = item.flickrtextsearch || "bokeh";
    let preferredSize = item.flickrphotosize || "k";
    
    if(item.flickrimgsource == "explore"){
        getImageFromExplore(preferredSize);
    }
    else if(item.flickrimgsource == "textsearch"){
        getImageFromTextSearch(flickrTextSearch, preferredSize);
    }
    else {
        getImageFromPhotoset(flickrsetid, preferredSize);
    }
    

}

var browser = (window.browser)? window.browser : window.chrome;
let requestFlickrSetId = browser.storage.sync.get();
requestFlickrSetId.then(onReceived, onError);

