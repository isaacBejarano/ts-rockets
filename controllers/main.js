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
    var templateLiItem = document.querySelector(".template-li-item");
    // 1. render List of Rockets
    Rocket.getRocketList.forEach(function (rocket, i) {
        // 1.1 clone HTML template + append <li>
        var cloned = templateLiItem.cloneNode(true);
        outletList.append(cloned);
        // 1.2 id + render
        cloned.id = "rocket-" + (i + 1);
        cloned.classList.remove("d-none");
        // 1.3 inject data + validation CSS
        // <- Rocket
        // prettier-ignore
        outletList
            .children[i + 1].children[0].children[0]
            .children[0].children[1].textContent = rocket.getId;
        // Rocket CSS
        if (rocket.getId === "not specified" || rocket.getId === "wrong code format") {
            // prettier-ignore
            outletList
                .children[i + 1].children[0].children[0]
                .children[0].children[1].classList.add("text-violet");
        }
        // <- Thrusters
        // prettier-ignore
        outletList
            .children[i + 1].children[0].children[0]
            .children[1].children[1].textContent = rocket.totalThrustersToString();
        // <- Max. Power
        // prettier-ignore
        outletList
            .children[i + 1].children[0].children[0]
            .children[2].children[1].textContent = rocket.totalMaxThrust();
        // Thrusters + Max. Power CSS
        if (+rocket.totalThrustersToString() < Rocket.getMinThrusters) {
            // prettier-ignore
            outletList
                .children[i + 1].children[0].children[0]
                .children[1].children[1].classList.add("text-violet"); // Thrusters
            // prettier-ignore
            outletList
                .children[i + 1].children[0].children[0]
                .children[2].children[1].classList.add("text-violet"); // Max. Power
        }
        //  REPEATED CODE REFACTOR
        // <- Current Thrust
        // prettier-ignore
        outletList
            .children[i + 1].children[0].children[0]
            .children[3].children[1].textContent = rocket.currentThrust();
        // <- Current Power
        // prettier-ignore
        outletList
            .children[i + 1].children[0].children[0]
            .children[4].children[1].textContent = rocket.currentPower().toString();
    });
    // 2. render number of Rockets
    outletSpan.textContent = Rocket.countToString(); // stringified
    // 3. TEST	//  liteners -> speed
    var speedUpButtons = document.querySelectorAll(".speed-up-power");
    var _loop_1 = function (i) {
        speedUpButtons[i].addEventListener("click", function () {
            Rocket.list[i - 1].speedUp();
        });
    };
    // HTML => exclude first btn / is visibility hidden -> i starts at 1
    for (var i = 1; i < speedUpButtons.length; i++) {
        _loop_1(i);
    }
}
