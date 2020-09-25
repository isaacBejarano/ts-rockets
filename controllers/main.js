"use strict";
/* INIT */
// thrusters
var merlin = new Thruster("Merlin");
var kestrel = new Thruster("Kestrel");
var raptor = new Thruster("Raptor");
var methalox = new Thruster("Methalox");
// rockets
var falconHeavy = new Rocket("32wessds");
var starShip = new Rocket("ldsfja32");
// add trhusters to rockets
falconHeavy.setThrusters = [merlin, merlin, kestrel];
starShip.setThrusters = [raptor, raptor, raptor, raptor, methalox, methalox];
/* toString */
Rocket.ListToString().forEach(function (rocket) {
    console.log(rocket.toString());
});
// TEST
console.log(Rocket.ListToString());
