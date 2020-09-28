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
// const testRocket9 = new Rocket("   test0006   "); // OK / .trim()
// testRocket9.setThrusters = [new Thruster("    Merlin-10      ", 10)]; // {"Merlin", 0} // OK / .trim()
// testRocket9.setThrusters = [new Thruster(" Merlin  ", -8)]; // {"Merlin", 0}
// testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
// ***************************
// 4. List of Rockets --init
renderList();
// 5. List of Rockets --update
var btnList = document.getElementById("btn-show-all-rockets"); // ref
var initialListlength = outletList.children.length;
/* LISTENER */
btnList.addEventListener("click", function () {
    if (outletList.children.length > initialListlength)
        renderList(); // update
    // show list
    outletP.classList.toggle("is-hidden");
    outletList.classList.toggle("is-hidden");
});
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
        injectData(i, 4, rocket.currentPower().toString()); // <- Current Power
        // 1.4 liteners -> speed up/down
        var speedUpButtons = document.querySelectorAll(".speed-up-power");
        var _loop_1 = function (j) {
            speedUpButtons[j].addEventListener("click", function () {
                Rocket.getRocketList[j - 1].speedUp(); // btn1 -> Rocket[0], etc...
                // injected data update
                // injectData(i, 3, rocket.currentThrust()); // <- Current Thrust
                // injectData(i, 4, rocket.currentPower().toString()); // <- Current Power
                console.log(outletList.children[0].children[0].children[0].children[3].children[1]);
            });
        };
        // HTML => exclude first btn / is visibility hidden -> i starts at 1
        for (var j = 1; j < speedUpButtons.length; j++) {
            _loop_1(j);
        }
        // 1.5 <li> validate CSS
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
    // console.log(
    // 	outletList
    // 	.children[0].children[0].children[0]
    // 	.children[HTMLTemplateIndex].children[1].textContent = 'lol'
    // 	)
    return (outletList.children[i + 1].children[0].children[0].children[HTMLTemplateIndex].children[1].textContent = action);
}
// prettier-ignore
function invalidCSS(i, HTMLTemplateIndex) {
    outletList
        .children[i + 1].children[0].children[0]
        .children[HTMLTemplateIndex].children[1].classList.add("text-violet");
}
