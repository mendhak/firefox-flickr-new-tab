const defaultFlickrSetId="72157716222153076";
const defaultFlickrTextSearch="bokeh";
const defaultPhotoSize="k";
const defaultImgSource="photoset";

var browser = (window.browser)? window.browser : window.chrome;

function showMessage(message){
    document.getElementById("debugtext").textContent = message;
}

function saveOptions(e) {
    e.preventDefault();
    
    showMessage("");

    
    let flickrImgSource = defaultImgSource;
    if(document.querySelector('input[name="imgsource"]:checked')){
        flickrImgSource = document.querySelector('input[name="imgsource"]:checked').value;
    }

    let flickrPhotoSize = defaultPhotoSize;
    if(document.querySelector('input[name="photosize"]:checked')){
        flickrPhotoSize = document.querySelector('input[name="photosize"]:checked').value;
    }

    let flickrSetID = document.querySelector("#flickrsetid").value;
    let flickrTextSearch = document.querySelector("#flickrtextsearch").value;
    
    browser.storage.sync.set({
        flickrsetid: flickrSetID,
        flickrimgsource: flickrImgSource,
        flickrphotosize: flickrPhotoSize,
        flickrtextsearch: flickrTextSearch
    });

    showMessage(`Values saved: ${flickrImgSource}, ${flickrSetID}, ${flickrTextSearch}, ${flickrPhotoSize}`);
}

function resetOptions(e) {
    e.preventDefault();
    showMessage("");
    document.querySelector("#flickrsetid").value = defaultFlickrSetId;
    document.querySelector("#flickrtextsearch").value = defaultFlickrTextSearch;
    document.querySelector(`#imgsource${defaultImgSource}`).checked = true;
    document.querySelector(`#photosize${defaultPhotoSize}`).checked = true;

    browser.storage.sync.set({
        flickrsetid: defaultFlickrSetId,
        flickrimgsource: defaultImgSource,
        flickrphotosize: defaultPhotoSize,
        flickrtextsearch: defaultFlickrTextSearch
    });
    showMessage("Values have been reset to defaults");
}

function restoreOptions() {

    showMessage("");

    function setCurrentChoice(result) {
        document.querySelector("#flickrsetid").value = result.flickrsetid || defaultFlickrSetId;
        document.querySelector("#flickrtextsearch").value = result.flickrtextsearch || defaultFlickrTextSearch;

        let selectedPhotoSize = result.flickrphotosize || defaultPhotoSize;
        document.querySelector(`#photosize${selectedPhotoSize}`).checked = true;

        let selectedImgSource = result.flickrimgsource || defaultImgSource;
        document.querySelector(`#imgsource${selectedImgSource}`).checked = true;
       
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", resetOptions);