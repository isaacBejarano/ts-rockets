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
Rocket.ListToString().forEach(function (rocket) {
    console.log(rocket.toString());
});
// TEST
console.log(Rocket.ListToString());
