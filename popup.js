document.getElementById('startProcessEighteen').onclick = function (element) {
    buttonclick('start', 18);
};

document.getElementById('stopProcessEighteen').onclick = function (element) {
    buttonclick('stop', 18);
};

document.getElementById('startProcessFortyfive').onclick = function (element) {
    buttonclick('start', 45);
};

document.getElementById('stopProcessFortyfive').onclick = function (element) {
    buttonclick('stop', 45);
};

document.getElementById('ageEighteen').onclick = function (element) {
    document.getElementById('eighteen').style.display = "block";
    document.getElementById('fortyfive').style.display = "none";
};

document.getElementById('ageFortyfive').onclick = function (element) {
    document.getElementById('eighteen').style.display = "none";
    document.getElementById('fortyfive').style.display = "block";
};

const buttonclick = (action, age) => {
    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];

        chrome.tabs.sendMessage(tab.id, { "message": action, "age": age });
    });
}

document.getElementById('startProcessEighteen').onclick = function (element) {
    buttonclick('start', 18);
};
