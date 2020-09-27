"use strict";
// 1. Thrusters & Rockets instances
var merlin10 = new Thruster("Merlin-10", 10);
var merlin30 = new Thruster("Merlin-30", 30);
var raptor40 = new Thruster("Raptor-40", 40);
var raptor50 = new Thruster("Raptor-50", 50);
var methalox80 = new Thruster("Methalox-80", 80);
var falconHeavy = new Rocket("32wessds");
var starShip = new Rocket("ldsfja32");
// 2. Add thrusters to rockets
// prettier-ignore
falconHeavy.setThrusters = [merlin10, merlin30, methalox80];
starShip.setThrusters = [merlin30, raptor40, raptor50, raptor50, merlin30, merlin10];
// 3. Outlet
var outletList = document.getElementById("list-all-rockets");
var outletP = document.getElementById("counter-rockets");
var outletSpan = document.querySelector("#counter-rockets .outlet");
// TEST *********************
// for (let i = 0; i < 10000; i++) {
// 	let someRocket = new Rocket("someRock"); // stack overflow
// }
// let testRocket2 = new Rocket("test0002"); // no thrusters specified
// let testRocket3 = new Rocket("test0003"); // insuficient thrusters
// testRocket3.setThrusters = [merlin10];
// let testRocket4 = new Rocket("test00044444444"); // wrong code format
// testRocket4.setThrusters = [merlin10, raptor40];
// let testRocket5 = new Rocket("t005"); // wrong code format
// testRocket5.setThrusters = [merlin10, raptor40];
// let testRocket6 = new Rocket("     "); // not specified
// testRocket6.setThrusters = [merlin10, raptor40];
// let testRocket7 = new Rocket(""); // not specified
// testRocket7.setThrusters = [merlin10, raptor40];
// let testRocket8 = new Rocket(); // not specified
// testRocket8.setThrusters = [merlin10, raptor40];
// let testRocket9 = new Rocket("   test0006   "); // OK / .trim()
// testRocket9.setThrusters = [merlin10, raptor40];
// const merlin10 = new Thruster("   Merlin  "); // ("Merlin", 0)
// const merlin30 = new Thruster(" Merlin  ", -8); // ("Merlin", 0)
// const methalox80 = new Thruster(); // ("not specified", 0)
// console.log(Rocket.getRocketList[1].getThrusters[0]);
// console.log(Rocket.getRocketList[1].getThrusters[1]);
// console.log(Rocket.getRocketList[1].getThrusters[2]);
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
}
// TEST
// 1.4 liteners -> speed
var speedUpButtons = document.querySelectorAll(".speed-up-power");
var _loop_1 = function (i) {
    console.log(speedUpButtons[i]);
    speedUpButtons[i].addEventListener("click", function () {
        Rocket.getRocketList[i - 1].speedUp(); // <- FALLA . DEBBUGG IT
        console.log(Rocket.getRocketList[i - 1]);
    });
};
// HTML => exclude first btn / is visibility hidden -> i starts at 1
for (var i = 1; i < speedUpButtons.length; i++) {
    _loop_1(i);
}
// let btnSpeedDown = document.querySelector(`#${cloned.id} .speed-down-power`) as HTMLButtonElement;
// btnSpeedUp.addEventListener("click", function () {
// 	rocket.speedUp(); // <-- FALLA
// 	console.log(rocket);
// 	console.log(rocket.currentThrust());
// 	console.log(rocket.currentPower());
// 	// <- Current Thrust
// 	// prettier-ignore
// 	outletList
// 		.children[i+1].children[0].children[0]
// 		.children[3].children[1].textContent = rocket.currentThrust();
// 	// <- Current Power
// 	// prettier-ignore
// 	outletList
// 		.children[i+1].children[0].children[0]
// 		.children[4].children[1].textContent = rocket.currentPower().toString();
// });
// btnSpeedDown.addEventListener("click", function () {
// 	console.log(rocket);
// });
