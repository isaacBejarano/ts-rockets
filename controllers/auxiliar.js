"use strict";
/* AUX */
// render "List of Rockets"
function renderList() {
    var templateLi = document.querySelector(".template-li-item");
    // 1. Render List of Rockets
    Rocket.getList.forEach(function (rocket, i) {
        // 1.1 <li> create all
        var cloned = templateLi.cloneNode(true); // clone template <li>
        outletList.append(cloned); // append <li>
        cloned.id = "rocket-" + (i + 1); // <li> id
        cloned.classList.remove("d-none"); // show <ol>
        // 1.2 <li> create id's for models
        var modelRocket = cloned.querySelector("#model-rocket");
        var modelThrusters = cloned.querySelector("#model-thrusters");
        var modelMaxThrust = cloned.querySelector("#model-max-thrust");
        var modelCurrentThrust = cloned.querySelector("#model-current-thrust");
        var modelTotalPower = cloned.querySelector("#model-total-power");
        modelRocket.id = "model-rocket-" + (i + 1); // Rocket
        modelThrusters.id = "model-thrusters-" + (i + 1); // Thrusters
        modelMaxThrust.id = "model-max-thrust-" + (i + 1); // Max.Thrust
        modelCurrentThrust.id = "model-current-thrust-" + (i + 1); // Current Thrust
        modelTotalPower.id = "model-total-power-" + (i + 1); // Total Pwower
        // 1.3 <li> inject data into models
        modelRocket.textContent = rocket.getId; // <- Rocket
        modelThrusters.textContent = rocket.thrustersLength().toString(); // <- Thrusters
        modelMaxThrust.textContent = rocket.totalMaxThrust(); // <- Max.Thrust
        modelCurrentThrust.textContent = rocket.currentThrust(); // <- Current Thrust
        modelTotalPower.textContent = rocket.totalPower().toString(); // <- Total Power
        // 1.4 <li> models Thrusters + Max.Thrust --validate CSS
        if (rocket.thrustersLength() < Rocket.getMinThrustersLength) {
            modelThrusters.classList.add("text-gold"); // ~ warning
            modelMaxThrust.classList.add("text-gold"); // ~ warning
        }
    });
    // 2. Render Number of Rockets
    outletSpan.textContent = Rocket.getListLength().toString();
}
// reset "List of Rockets"
function resetList() {
    while (outletList.children.length > 1) {
        var lastChild = outletList.querySelector("#" + outletList.id + " li:last-child");
        outletList.removeChild(lastChild);
    }
    // NOTE: Don't remove firstChild since it's the <li> template to clone in outlet <ol>
}
// Add Speed Event
function addSpeedEvent() {
    var speedUpButtons = document.getElementsByClassName("speed-up-power");
    var speedDownButtons = document.getElementsByClassName("speed-down-power");
    var _loop_1 = function (i) {
        // buttons and models [0] are hidden / they belong to <li> template
        var modelCurrentThrust = document.getElementById("model-current-thrust-" + (i + 1));
        var modelTotalPower = document.getElementById("model-total-power-" + (i + 1));
        speedUpButtons[i + 1].addEventListener("click", function () {
            Rocket.getList[i].speedUp(); // update Rocket.list
            modelCurrentThrust.textContent = Rocket.getList[i].currentThrust(); // <- Current Thrust
            modelTotalPower.textContent = Rocket.getList[i].totalPower().toString(); // <- Total Power
        });
        speedDownButtons[i + 1].addEventListener("click", function () {
            Rocket.getList[i].speedDown(); // update Rocket.list
            modelCurrentThrust.textContent = Rocket.getList[i].currentThrust(); // <- Current Thrust
            modelTotalPower.textContent = Rocket.getList[i].totalPower().toString(); // <- Total Power
        });
    };
    for (var i = 0; i < Rocket.getListLength(); i++) {
        _loop_1(i);
    }
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
// ES6's Number.isInteger() doesn't exist in ES5 -> my workaround by "isInt(num)"
function isInt(x) {
    var num = "" + x * 10; // stringified
    return num[num.length - 1] === "0" ? true : false;
}
