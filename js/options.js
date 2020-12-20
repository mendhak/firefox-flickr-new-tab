const defaultFlickrSetId="72157716222153076";

function showMessage(message){
    document.getElementById("debugtext").innerHTML = message;
}

function saveOptions(e) {
    e.preventDefault();
    
    showMessage("");
    
    let flickrImgSource = "photoset";
    let flickrSetID = document.querySelector("#flickrsetid").value;
    if(document.querySelector("#chooseexplore").checked){
        flickrImgSource = "explore";
    }
    
    browser.storage.sync.set({
        flickrsetid: flickrSetID,
        flickrimgsource: flickrImgSource
    });

    showMessage(`Values saved: ${flickrImgSource}, ${flickrSetID}`);
}

function resetOptions(e) {
    e.preventDefault();
    showMessage("");
    document.querySelector("#flickrsetid").value = defaultFlickrSetId;
    document.querySelector("#choosephotoset").checked = true;
    browser.storage.sync.set({
        flickrsetid: defaultFlickrSetId,
        flickrimgsource: "photoset"
    });
    showMessage("Values have been reset to defaults");
}

function restoreOptions() {

    showMessage("");

    function setCurrentChoice(result) {
        document.querySelector("#flickrsetid").value = result.flickrsetid || defaultFlickrSetId;

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