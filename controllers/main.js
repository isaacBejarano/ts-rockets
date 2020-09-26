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
falconHeavy.setThrusters = [merlin10, merlin30, methalox80];
starShip.setThrusters = [merlin30, raptor40, raptor50, raptor50, merlin30, merlin10];
// 3. Outlet
var outletList = document.getElementById("list-all-rockets");
var outletSpan = document.getElementById("counter-rockets");
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
var btn = document.getElementById("btn-show-all-rockets"); // ref
var initialListlength = outletList.children.length;
/* LISTENER */
btn.addEventListener("click", function () {
    if (outletList.children.length > initialListlength)
        renderList(); // update
    // show list
    outletSpan.classList.toggle("is-hidden");
    outletList.classList.toggle("is-hidden");
});
/* LIB */
function renderList() {
    var templateLiItem = document.querySelector(".template-li-item");
    // render List of Rockets
    Rocket.getRocketList.forEach(function (rocket, i) {
        // 1. clone HTML template
        var cloned = templateLiItem.cloneNode(true);
        // 2. append cloned + make it visible
        outletList.append(cloned);
        cloned.classList.remove("d-none");
        // 3. inject data + validation CSS
        // Rocket
        outletList.children[i].children[0].children[0].children[1].textContent = rocket.getId;
        if (rocket.getId === "not specified" || rocket.getId === "wrong code format")
            outletList.children[i].children[0].children[0].children[1].classList.add("text-danger");
        // Thrusters
        outletList.children[i].children[0].children[1].children[1].textContent = rocket.totalThrustersToString();
        if (+rocket.totalThrustersToString() < Rocket.getminThrusters) {
            outletList.children[i].children[0].children[1].children[1].classList.add("text-danger");
            outletList.children[i].children[0].children[2].children[1].classList.add("text-danger");
        }
        // Max. Power
        outletList.children[i].children[0].children[2].children[1].textContent = rocket.totalMaxThrust();
    });
    // render number of Rockets in the List
    outletSpan.textContent = "Rockets: " + Rocket.countToString(); // stringified
}
