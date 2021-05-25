let ageGroup = 18;
// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.message === 'start') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        if (msg.age == 18)
            ageGroup = 18
        else if (msg.age == 45)
            ageGroup = 45

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
    if (SearchInterval)
        stopProcess();
        
    document.getElementsByClassName('pin-search-btn')[0].click();

    SearchInterval = setInterval(function () {
        if (document.getElementsByClassName('mat-selection-list')[0].children.length > 0) {
            clearInterval(SearchInterval);
            RowsCount = document.getElementsByClassName('mat-selection-list')[0].children.length;
            //console.log(RowsCount + "____Searched");
            clickEighteen();
        }
    }, 1500)
}
const stopProcess = () => {
    RowsCount = 0;
    clearInterval(SearchInterval);
}

const clickEighteen = () => {
    if (ageGroup === 18)
        document.getElementsByClassName('agefilterblock')[0].children[0].children[1].click();
    if (ageGroup === 45)
        document.getElementsByClassName('agefilterblock')[0].children[1].children[1].click();

    SearchInterval = setInterval(function () {
        if (document.getElementsByClassName('mat-selection-list')[0].children.length < RowsCount) {
            clearInterval(SearchInterval);
            RowsCount = document.getElementsByClassName('mat-selection-list')[0].children.length;
            //console.log(RowsCount + "____Searched");
            RowsCount = 0;
            checkAvailableSlot();
        }
    }, 1500)
}

const checkAvailableSlot = () => {
    let allChilds = document.getElementsByClassName('mat-selection-list')[0].children
    for (let index = 0; index < allChilds.length; index++) {
        const element = allChilds[index];
        const getActiveButton = element.querySelectorAll('ul.slot-available-wrap')[0].children[1].querySelector('a');
        const activeButtonText = getActiveButton.text.trim();
        //console.log(activeButtonText);
        if (!isNaN(activeButtonText)) {
            if (parseInt(activeButtonText) > 0) {
                //console.log('Slot Available');
                stopProcess();
                getActiveButton.click();
                setTimeout(() => {
                    enterCaptcha();
                }, 500);
                return;
            }
        }
    }
    startProcess();
}

const enterCaptcha = () => {
    let timeSlotInd = 1;
    let timeSlots = $('.time-slot');
    let slotind = 1;
    if (timeSlots.length === 0) return;
    if (timeSlots.length === 4) {
        try {
            slotind = parseInt(timeSlotInd) - 1;

        } catch (e) {
            slotind = 1
        }
    }
    if (isNaN(slotind)) {
        slotind = 1
    }
    timeSlots[slotind].click();
    // setTimeout(() => {
    //     $('.captcha-style').children[1].children[0].focus();
    //     $('.captcha-style').children[1].children[0].select();
    // }, 50);

    // setTimeout(() => {
    //     $("ion-button.confirm-btn")[0].click();
    // }, 500)
}
