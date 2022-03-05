chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.match(/https:\/\/.*\.console\.aws\.amazon\.com\/*/)) {
        if (changeInfo.status == "complete") {
            chrome.tabs.sendMessage(tabId, { url: tab.url }, (response) => {
            });
        }
    }
});
