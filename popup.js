let StartButton = document.getElementById('startProcess');

StartButton.onclick = function (element) {

    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];

        chrome.tabs.sendMessage(tab.id, { "message": "start" });
    });
};

let StopButton = document.getElementById('stopProcess');

StopButton.onclick = function (element) {

    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];

        chrome.tabs.sendMessage(tab.id, { "message": "stop" });
    });
};