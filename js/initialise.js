

getImage = function(flickrsetid) {
    api_key='ce627966d2544e939f0306fcbfd919ce';
    set_id=flickrsetid;
    
    
    var flickrURL =  'https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&extras=url_k,url_3k,url_4k,url_q,url_o&api_key=' 
                        + api_key 
                        + '&photoset_id=' + set_id 
                        + '&per_page=100' 
                        + '&sort=date-posted-desc&format=json&nojsoncallback=1';
        
    fetch(flickrURL)
      .then(response => response.json())
      .then(data => {
          let img = data.photoset.photo[Math.floor(Math.random() * data.photoset.photo.length)];
          let photoLink = "https://www.flickr.com/photos/" + data.photoset.owner  + "/" + img.id + "/";
          document.getElementById("theimage").setAttribute("src",img.url_k);
          document.getElementById("thelink").setAttribute("href",photoLink);
      }); 

}



function onError(error) {
    console.log(`Error: ${error}`);
}

function onReceived(item) {
    let flickrsetid = "72157716222153076";
    if (item.flickrsetid) {
        flickrsetid = item.flickrsetid;
    }
    console.log(flickrsetid);
    getImage(flickrsetid);
}

let requestFlickrSetId = browser.storage.sync.get("flickrsetid");
requestFlickrSetId.then(onReceived, onError);

