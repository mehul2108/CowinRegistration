// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.message === 'start') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        startProcess();
        sendResponse("123");
    }
    if (msg.message === 'stop') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        stopProcess();
        sendResponse("123");
    }
});

let SearchInterval;
let RowsCount = 0;
const startProcess = () => {
    document.getElementsByClassName('district-search')[0].click()
    SearchInterval = setInterval(function () {
        if (document.getElementsByClassName('mat-selection-list')[0].children.length > 0) {
            clearInterval(SearchInterval);
            RowsCount = document.getElementsByClassName('mat-selection-list')[0].children.length;
            //console.log(RowsCount + "____Searched");
            clickEighteen();
        }
    }, 50)
}
const stopProcess = () => {
    RowsCount = 0;
    clearInterval(SearchInterval);
}

const clickEighteen = () => {
    document.getElementsByClassName('agefilterblock')[0].children[0].children[1].click();
    SearchInterval = setInterval(function () {
        if (document.getElementsByClassName('mat-selection-list')[0].children.length < RowsCount) {
            clearInterval(SearchInterval);
            RowsCount = document.getElementsByClassName('mat-selection-list')[0].children.length;
            //console.log(RowsCount + "____Searched");
            RowsCount = 0;
            checkAvailableSlot();
        }
    }, 50)
}

const checkAvailableSlot = () => {
    let allChilds = document.getElementsByClassName('mat-selection-list')[0].children
    for (let index = 0; index < allChilds.length; index++) {
        const element = allChilds[index];
        if (element.querySelector('ul').children.length > 2) {
            const getActiveButton = element.querySelector('ul').children[1].querySelector('a');
            const activeButtonText = getActiveButton.text.trim();
            //console.log(activeButtonText);
            if (!isNaN(activeButtonText)) {
                if (parseInt(activeButtonText) > 80) {
                    //console.log('Slot Available');
                    stopProcess();
                    getActiveButton.click()
                    break;
                }
            }
        }
    }
    startProcess();
}
