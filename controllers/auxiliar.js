"use strict";
// AUXILIARY FUNCTIONS
function renderListReset() {
    // lengt > 1 / firstChild is the template <li> with HTMNL to clone
    while (outletList.children.length > 1) {
        outletList.removeChild(outletList.children[outletList.children.length - 1]);
    }
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
        injectData(i, 4, rocket.totalPower().toString()); // <- Total Power
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
function injectDataFromSpeed(buton, i) {
    var _a, _b, _c, _d;
    var outletCurrentThrust = (_b = (_a = buton.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[3].children[1];
    var outletCurrentPower = (_d = (_c = buton.parentElement) === null || _c === void 0 ? void 0 : _c.previousElementSibling) === null || _d === void 0 ? void 0 : _d.children[4].children[1];
    outletCurrentThrust.textContent = Rocket.getRocketList[i - 1].currentThrust(); // <- Current Thrust
    outletCurrentPower.textContent = Rocket.getRocketList[i - 1].totalPower().toString(); // <- Total Power
}
