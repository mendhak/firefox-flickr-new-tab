const defaultFlickrSetId="72157716222153076";

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        flickrsetid: document.querySelector("#flickrsetid").value
    });
}

function resetOptions(e) {
    e.preventDefault();
    document.querySelector("#flickrsetid").value = defaultFlickrSetId;
    browser.storage.sync.set({
        flickrsetid: defaultFlickrSetId
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#flickrsetid").value = result.flickrsetid || defaultFlickrSetId;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("flickrsetid");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", resetOptions);