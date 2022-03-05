chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.url);
    if (message.url.match(/https:\/\/.*\.console\.aws\.amazon\.com\/.*/)) {
        addAccountName();
        sendResponse({ message: "ok" })
    }
});

function addAccountName(): void {
    const nav = document.getElementsByClassName("globalNav-0336")[0];
    if (nav) {
        if (nav.getElementsByClassName("aws-account-name").length) {
            return
        }

        chrome.storage.local.get("awsAccounts").then((resolve) => {
            const matches = nav.textContent.match(/\d{4}-\d{4}-\d{4}/);
            const accountId = matches[0].replace(/-/g, "");
            const account = resolve.awsAccounts[accountId];
            nav.insertBefore(createAccountNameElement(account.name), nav.firstChild)
        })
    }
}

// <div class="aws-account-name">
//   <span>アカウント名: ${AWS_ACCOUNT_NAME}</span>
// </div>
function createAccountNameElement(accountName: string): Element {
    const div = document.createElement("div")
    div.setAttribute("class", "aws-account-name")
    const span = document.createElement("span")
    const text = document.createTextNode("アカウント名: " + accountName)
    span.appendChild(text)
    div.appendChild(span)
    return div
}
