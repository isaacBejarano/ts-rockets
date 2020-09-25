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
// <span>
var outletSpan = document.getElementById("counter-rockets");
outletSpan.textContent = "Total Rockets: " + Rocket.CountToString(); // stringified
// <ol>
var outletList = document.getElementById("list-all-rockets");
// append
Rocket.ListToString().forEach(function (rocket) {
    var listItem = document.createElement("li");
    var listP = document.createElement("p");
    listItem.classList.add("text-light", "mx-5", "px-3");
    outletList.append(listItem);
    listItem.append(listP);
    listP.textContent = rocket.toString();
    // console.log(rocket.toString());
});
// REFS + Listener
var btn = document.getElementById("btn-show-all-rockets");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    outletSpan.classList.toggle("is-hidden");
    outletList.classList.toggle("is-hidden");
});
// TEST
console.log(Rocket.ListToString());
