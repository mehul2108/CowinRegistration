
document.getElementById('stopProcess').onclick = function (element) {
    buttonclick('stop');
};

document.getElementById('startProcess').onclick = function (element) {
    buttonclick('start');
};


const buttonclick = (action) => {
    let ageSelection = parseInt($('input[name="ageSelection"]:checked').val());
    let daySelection = $('input[name="daySelection"]:checked').val();
    let chargeSelection = $('input[name="chargeSelection"]:checked').val();
    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, { "message": action, "age": ageSelection, "day": daySelection, "charge": chargeSelection });
    });
}
