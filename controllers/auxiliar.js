"use strict";
// AUXILIARY FUNCTIONS
function renderListReset() {
    while (outletList.children.length > 1) {
        // Don't remove firstChild since it's the <li> template to clone in outlet <ol>
        var lastElement = outletList.children[outletList.children.length - 1];
        outletList.removeChild(lastElement);
    }
}
function renderList() {
    var templateLiItem = document.querySelector(".template-li-item");
    // 1. Render List of Rockets
    Rocket.getList.forEach(function (rocket, i) {
        // 1.1 clone + append <li>
        var cloned = templateLiItem.cloneNode(true);
        outletList.append(cloned);
        // 1.2 <li> -> add id's + show
        var currentThrustOutlet = cloned.querySelector("#current-thrust");
        var totalPowerOutlett = cloned.querySelector("#current-thrust");
        cloned.classList.remove("d-none");
        cloned.id = "rocket-" + (i + 1); // Rocket
        currentThrustOutlet.id = "current-thrust-" + (i + 1); // Current Thrust
        totalPowerOutlett.id = "total-power-" + (i + 1); // Total Pwower
        // 1.3 <li> <- inject data
        dataToDOM(i, 0, rocket.getId); // <- Rocket
        dataToDOM(i, 1, rocket.thrustersLength().toString()); // <- Thrusters
        dataToDOM(i, 2, rocket.totalMaxThrust()); // <- Max. Power
        dataToDOM(i, 3, rocket.currentThrust()); // <- Current Thrust
        dataToDOM(i, 4, rocket.totalPower().toString()); // <- Total Power
        // 1.4 <li> validate CSS
        if (rocket.getId === "not specified" || rocket.getId === "wrong code format")
            invalidCSS(i, 0); // Rocket
        if (rocket.thrustersLength() < Rocket.getMinThrustersLength) {
            invalidCSS(i, 1); // Thrusters
            invalidCSS(i, 2); // Max. Thrust
        }
    });
    // 2. Render Number of Rockets
    outletSpan.textContent = Rocket.getListLength().toString(); // stringified
}
// Add Speed Event
function addSpeedEvent() {
    var speedUpButtons = document.getElementsByClassName("speed-up-power");
    var speedDownButtons = document.getElementsByClassName("speed-down-power");
    var _loop_1 = function (i) {
        speedUpButtons[i + 1].addEventListener("click", function () {
            Rocket.getList[i].speedUp(); // update Rocket.list
            speedToDOM(this, i); // update DOM
        });
        speedDownButtons[i + 1].addEventListener("click", function () {
            Rocket.getList[i].speedDown(); // update Rocket.list
            speedToDOM(this, i); // update DOM
        });
    };
    // speedUpButtons[0] is hidden => Rocket[i] -> btn[i+1]
    for (var i = 0; i < Rocket.getListLength(); i++) {
        _loop_1(i);
    }
}
// prettier-ignore
function dataToDOM(i, HTMLTemplateIndex, action) {
    return (outletList.children[i + 1].children[0].children[0].children[HTMLTemplateIndex].children[1].textContent = action);
}
// prettier-ignore
function invalidCSS(i, HTMLTemplateIndex) {
    outletList
        .children[i + 1].children[0].children[0]
        .children[HTMLTemplateIndex].children[1].classList.add("text-violet");
}
function speedToDOM(buton, i) {
    var _a, _b, _c, _d;
    var outletCurrentThrust = (_b = (_a = buton.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[3].children[1];
    var outletCurrentPower = (_d = (_c = buton.parentElement) === null || _c === void 0 ? void 0 : _c.previousElementSibling) === null || _d === void 0 ? void 0 : _d.children[4].children[1];
    outletCurrentThrust.textContent = Rocket.getList[i].currentThrust(); // <- Current Thrust
    outletCurrentPower.textContent = Rocket.getList[i].totalPower().toString(); // <- Total Power
}
// render Thrusters Provisional list
function renderProvisionalThrustersList(lastRocket) {
    var listToString = "";
    for (var _i = 0, _a = lastRocket.getProvisionalThrustersList; _i < _a.length; _i++) {
        var thruster = _a[_i];
        listToString += "{ " + thruster.getModel + " : " + thruster.getMaxThrust + " } , ";
    }
    listToString.length > 0
        ? provisionalThrustersList.classList.add("d-block")
        : provisionalThrustersList.classList.remove("d-block");
    provisionalThrustersList.innerHTML = "" + listToString;
}
// dissable/enable Rockets <form>
function disableFormRocket(boolean) {
    inputRocket.disabled = boolean;
    inputRocket.classList.toggle("is-not-allowed");
    btnSubmitRocket.disabled = boolean;
    btnSubmitRocket.classList.toggle("is-not-allowed");
}
// Number.isInteger() is ES6, doesn't exist in ES5 -> my workaround => isInt(num)
function isInt(x) {
    var num = "" + (x * 10); // stringified
    return num[num.length - 1] === "0" ? true : false;
}
