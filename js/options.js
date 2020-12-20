const defaultFlickrSetId="72157716222153076";
const defaultPhotoSize="k";
const defaultImgSource="photoset";

function showMessage(message){
    document.getElementById("debugtext").innerHTML = message;
}

function saveOptions(e) {
    e.preventDefault();
    
    showMessage("");

    
    let flickrImgSource = "photoset";
    let flickrSetID = document.querySelector("#flickrsetid").value;
    let flickrPhotoSize = "k";


    if(document.querySelector("#chooseexplore").checked){
        flickrImgSource = "explore";
    }

    if(document.querySelector('input[name="photosize"]:checked')){
        flickrPhotoSize = document.querySelector('input[name="photosize"]:checked').value;
    }

    
    browser.storage.sync.set({
        flickrsetid: flickrSetID,
        flickrimgsource: flickrImgSource,
        flickrphotosize: flickrPhotoSize
    });

    showMessage(`Values saved: ${flickrImgSource}, ${flickrSetID}, ${flickrPhotoSize}`);
}

function resetOptions(e) {
    e.preventDefault();
    showMessage("");
    document.querySelector("#flickrsetid").value = defaultFlickrSetId;
    document.querySelector(`#choose${defaultImgSource}`).checked = true;
    document.querySelector(`#photosize${defaultPhotoSize}`).checked = true;

    browser.storage.sync.set({
        flickrsetid: defaultFlickrSetId,
        flickrimgsource: defaultImgSource,
        flickrphotosize: defaultPhotoSize,
    });
    showMessage("Values have been reset to defaults");
}

function restoreOptions() {

    showMessage("");

    function setCurrentChoice(result) {
        document.querySelector("#flickrsetid").value = result.flickrsetid || defaultFlickrSetId;

        let selectedPhotoSize = result.flickrphotosize || defaultPhotoSize;
        document.querySelector(`#photosize${selectedPhotoSize}`).checked = true;

        switch(result.flickrimgsource){
            case "explore":
                document.querySelector("#chooseexplore").checked = true;
                break;
            case "photoset":
            default:
                document.querySelector("#choosephotoset").checked = true;
                break;
        }
        
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