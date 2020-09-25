"use strict";
// 1. set thrusters and rockets
var merlin10 = new Thruster("Merlin", 10);
var merlin30 = new Thruster("Merlin", 30);
var kestrel80 = new Thruster("Kestrel", 80);
var raptor30 = new Thruster("Raptor", 30);
var raptor40 = new Thruster("Raptor", 40);
var raptor50 = new Thruster("Raptor", 50);
var raptor50b = new Thruster("Raptor", 50);
var methalox30 = new Thruster("Methalox", 30);
var methalox10 = new Thruster("Methalox", 10);
var falconHeavy = new Rocket("32wessds");
var starShip = new Rocket("ldsfja32");
// 2. add thrusters to rockets
falconHeavy.setThrusters = [merlin10, merlin30, kestrel80];
starShip.setThrusters = [raptor30, raptor40, raptor50, raptor50b, methalox30, methalox10];
// 3. outlet
var outletList = document.getElementById("list-all-rockets");
var outletSpan = document.getElementById("counter-rockets");
outletSpan.textContent = "Rockets: " + Rocket.CountToString(); // stringified
// 4. list of Rockets --init
renderList();
// 5. List of Rockets --update
var btn = document.getElementById("btn-show-all-rockets"); // ref
var initialListlength = outletList.children.length;
// listener
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
    Rocket.rocketList.forEach(function (rocket, i) {
        // 1. clone HTML template
        var cloned = templateLiItem.cloneNode(true);
        // 2. append cloned + make it visible
        outletList.append(cloned);
        cloned.classList.remove("d-none");
        // 3. inject data
        outletList.children[i].children[0].children[1].textContent = rocket.getId;
        outletList.children[i].children[1].children[1].textContent = rocket.thrustersToString();
        outletList.children[i].children[2].children[1].textContent = rocket.totalMaxThrust();
    });
}
