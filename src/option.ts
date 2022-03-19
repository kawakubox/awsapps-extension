window.addEventListener("load", () => {
    console.log("Window loaded.")
    chrome.storage.local.get("awsAccounts").then((resolve) => {
        let list = document.getElementById("account-list")
        let tbody = list.getElementsByTagName("tbody")[0]
        tbody.innerHTML = ""

        for (const [key, value] of Object.entries(resolve.awsAccounts)) {
            tbody.appendChild(buildTableRow(value))
        }
    })
})

function buildTableRow(value) {
    let row = document.createElement("tr")
    row.setAttribute("name", "account-row")
    let colId = document.createElement("td")
    colId.appendChild(document.createTextNode(value.id))
    let colName = document.createElement("td")
    colName.appendChild(document.createTextNode(value.name))
    row.appendChild(colId)
    row.appendChild(colName)
    row.appendChild(buildSelectBox(value.color))

    row.style.backgroundColor = value.color;

    row.addEventListener("change", (e) => {
        console.log(e)
        console.log(e.currentTarget)
        console.log(e.target.value)
        e.srcElement.style.backgroundColor = e.target.value;
        row.style.backgroundColor = e.target.value;

        chrome.storage.local.get("awsAccounts").then((resolve) => {
            let awsAccounts = resolve.awsAccounts
            let account = awsAccounts[value.id]
            console.log(account)
            account.color = e.target.value
            awsAccounts[value.id] = account
            console.log(awsAccounts)
            chrome.storage.local.set({awsAccounts: awsAccounts}, () => {
            })
        })
    })
    return row
}

function buildSelectBox(currentColor) {
    let selectBox = document.createElement("select")
    selectBox.appendChild(buildSelectOption("white", "white", isSelected("white", currentColor)))
    selectBox.appendChild(buildSelectOption("lightcyan", "lightcyan", isSelected("lightcyan", currentColor)))
    selectBox.appendChild(buildSelectOption("lightyellow", "lightyellow", isSelected("lightyellow", currentColor)))
    selectBox.appendChild(buildSelectOption("lightgreen", "lightgreen", isSelected("lightgreen", currentColor)))
    selectBox.appendChild(buildSelectOption("lightpink", "lightpink", isSelected("lightpink", currentColor)))
    selectBox.appendChild(buildSelectOption("lightgray", "lightgray", isSelected("lightgray", currentColor)))
    selectBox.style.backgroundColor = currentColor
    return selectBox
}

function buildSelectOption(text, value, selected) {
    let v = value ? value : text
    let option = document.createElement("option")
    option.setAttribute("value", v)
    if (selected) {
        option.setAttribute("selected", "selected")
    }
    option.appendChild(document.createTextNode(text))
    return option
}

function isSelected(color, currentColor) {
    return color == currentColor
}