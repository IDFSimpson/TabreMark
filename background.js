const BASE_URL = "https://tabre.herokuapp.com/";
// const BASE_URL = "http://10.0.0.10:3000/";
// const BASE_URL = "http://192.168.0.11:3000/";
const REQUEST_URL = BASE_URL + "api/v1/bookmarks/";

function start(tab) {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) =>{
     postTab(tabs[0]);
  });
}

function fetchData() {
  fetch(REQUEST_URL)
  .then((response) => response.json())
  .then((responseData) => {
      console.log(responseData);
      return responseData;
  });
}

function postTab(tab) {
  fetch(REQUEST_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bookmark: {
        "name": tab.title,
        "url": tab.url,
      }
    })
  });
}


chrome.browserAction.onClicked.addListener(start);
