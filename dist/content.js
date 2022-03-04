const bgcolor = "lightpink";
function sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
sleep(1000)
    .then(draw)
    .then(storeAccounts);
function draw() {
    const portalApps = document.getElementsByTagName("portal-application");
    portalApps[0].addEventListener("click", (event) => {
        const elements = document.getElementsByClassName("name");
        Array.prototype.forEach.call(elements, (element) => {
            if (element.textContent.match(/PROD-*/)) {
                element.parentElement.parentElement.style.backgroundColor = bgcolor;
            }
        });
    });
}
function storeAccounts() {
    const portalApps = document.getElementsByTagName("portal-application");
    portalApps[0].addEventListener("click", (event) => {
        const instanceSections = document.getElementsByClassName("instance-section");
        if (instanceSections.length) {
            const accounts = AwsAccountDict.parse(instanceSections);
            console.log(accounts);
            // LocalStorage に格納する
        }
    });
}
class AwsAccount {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class AwsAccountDict {
    static parse(elements) {
        let dict = new AwsAccountDict();
        Array.prototype.forEach.call(elements, (element) => {
            const accountName = element.getElementsByClassName("name")[0].textContent;
            const accountId = element.getElementsByClassName("accountId")[0].textContent.substring(1);
            dict[accountId] = new AwsAccount(accountId, accountName);
        });
        return dict;
    }
}
