"use strict";
// 1. Rockets instances
var falconHeavy = new Rocket("32wessds");
var starShip = new Rocket("ldsfja32");
// 2. Add thrusters to rockets
falconHeavy.setThrusters = [
    new Thruster("Merlin-10", 10),
    new Thruster("Merlin-30", 30),
    new Thruster("Methalox-80", 80),
];
starShip.setThrusters = [
    new Thruster("Merlin-30", 30),
    new Thruster("Merlin-40", 40),
    new Thruster("Merlin-50", 50),
    new Thruster("Raptor-50", 50),
    new Thruster("Raptor-30", 30),
    new Thruster("Raptor-10", 10),
];
// 3. Outlet
var outletList = document.getElementById("list-all-rockets");
var outletP = document.getElementById("counter-rockets");
var outletSpan = document.querySelector("#counter-rockets .outlet");
// TEST *********************
// for (let i = 0; i < 10000; i++) {
// 	let someRocket = new Rocket("someRock"); // stack overflow
// }
// const testRocket2 = new Rocket("test0001"); // no thrusters specified
// const testRocket4 = new Rocket("test000222222"); // wrong code format
// const testRocket5 = new Rocket("t005"); // wrong code format
// const testRocket6 = new Rocket("     "); // not specified
// const testRocket7 = new Rocket(""); // not specified
// const testRocket8 = new Rocket(); // not specified
// const testRocket9 = new Rocket("   test0009   "); // OK / .trim()
// testRocket9.setThrusters = [new Thruster("    Merlin-10      ", 10)]; // {"Merlin", 0} // OK / .trim()
// testRocket9.setThrusters = [new Thruster(" Merlin  ", -8)]; // {"Merlin", 0}
// testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
// testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
// ***************************
// 4. List of Rockets --init
renderList();
// 5. List of Rockets --onclick to update
var btnList = document.getElementById("btn-show-all-rockets");
var initialListlength = outletList.children.length;
btnList.addEventListener("click", function () {
    // update
    if (outletList.children.length > initialListlength)
        renderList();
    // show list
    outletP.classList.toggle("is-hidden");
    outletList.classList.toggle("is-hidden");
});
// 6. Speed --onclick
var speedUpButtons = document.querySelectorAll(".speed-up-power");
var speedDownButtons = document.querySelectorAll(".speed-down-power");
var _loop_1 = function (i) {
    // speedUpButtons[0] is visibility hidden
    speedUpButtons[i].addEventListener("click", function () {
        var _a, _b, _c, _d;
        // update data
        Rocket.getRocketList[i - 1].speedUp();
        // inject updated data in ref
        var outletCurrentThrust = (_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[3].children[1];
        var outletCurrentPower = (_d = (_c = this.parentElement) === null || _c === void 0 ? void 0 : _c.previousElementSibling) === null || _d === void 0 ? void 0 : _d.children[4].children[1];
        outletCurrentThrust.textContent = Rocket.getRocketList[i - 1].currentThrust();
        outletCurrentPower.textContent = Rocket.getRocketList[i - 1].totalPower().toString();
    });
};
// 6.1 speed up
for (var i = 1; i < speedUpButtons.length; i++) {
    _loop_1(i);
}
var _loop_2 = function (i) {
    // speedUpButtons[0] is visibility hidden
    speedDownButtons[i].addEventListener("click", function () {
        var _a, _b, _c, _d;
        // update data
        Rocket.getRocketList[i - 1].speedDown();
        // inject updated data in ref
        var outletCurrentThrust = (_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[3].children[1];
        var outletCurrentPower = (_d = (_c = this.parentElement) === null || _c === void 0 ? void 0 : _c.previousElementSibling) === null || _d === void 0 ? void 0 : _d.children[4].children[1];
        outletCurrentThrust.textContent = Rocket.getRocketList[i - 1].currentThrust();
        outletCurrentPower.textContent = Rocket.getRocketList[i - 1].totalPower().toString();
    });
};
// speed down 6.2
for (var i = 1; i < speedDownButtons.length; i++) {
    _loop_2(i);
}
/* LIB */
function renderList() {
    // 1. Render List of Rockets
    var templateLiItem = document.querySelector(".template-li-item");
    Rocket.getRocketList.forEach(function (rocket, i) {
        // 1.1 clone + append <li>
        var cloned = templateLiItem.cloneNode(true);
        outletList.append(cloned);
        // 1.2 <li> -> id + show
        cloned.id = "rocket-" + (i + 1);
        cloned.classList.remove("d-none");
        // 1.3 <li> <- inject data
        injectData(i, 0, rocket.getId); // <- Rocket
        injectData(i, 1, rocket.thrustersLength().toString()); // <- Thrusters
        injectData(i, 2, rocket.totalMaxThrust()); // <- Max. Power
        injectData(i, 3, rocket.currentThrust()); // <- Current Thrust
        injectData(i, 4, rocket.totalPower().toString()); // <- Current Power
        // 1.4 <li> validate CSS
        if (rocket.getId === "not specified" || rocket.getId === "wrong code format")
            invalidCSS(i, 0); // Rocket
        if (rocket.thrustersLength() < Rocket.getMinThrustersLength) {
            invalidCSS(i, 1); // Thrusters
            invalidCSS(i, 2); // Max. Power
        }
    });
    // 2. Render Number of Rockets
    outletSpan.textContent = Rocket.getListLength().toString(); // stringified
}
/* AUX */
// prettier-ignore
function injectData(i, HTMLTemplateIndex, action) {
    return (outletList.children[i + 1].children[0].children[0].children[HTMLTemplateIndex].children[1].textContent = action);
}
// prettier-ignore
function invalidCSS(i, HTMLTemplateIndex) {
    outletList
        .children[i + 1].children[0].children[0]
        .children[HTMLTemplateIndex].children[1].classList.add("text-violet");
}
