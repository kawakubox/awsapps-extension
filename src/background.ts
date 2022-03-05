chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.match(/https:\/\/.*\.console\.aws\.amazon\.com\/*/)) {
        console.log("URL matched")
        if (changeInfo.status == "complete") {
            chrome.tabs.sendMessage(tabId, {url: tab.url}, (response) => {
                console.log("response:" + response);
            });
        }
    }
});
