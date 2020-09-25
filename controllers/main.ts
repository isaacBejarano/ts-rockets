/* INIT */

// thrusters
const merlin = new Thruster("Merlin");
const kestrel = new Thruster("Kestrel");
const raptor = new Thruster("Raptor");
const methalox = new Thruster("Methalox");

// rockets
let falconHeavy = new Rocket("32wessds");
let starShip = new Rocket("ldsfja32");

// add trhusters to rockets
falconHeavy.setThrusters = [merlin, merlin, kestrel];
starShip.setThrusters = [raptor, raptor, raptor, raptor, methalox, methalox];

/* toString */
Rocket.ListToString().forEach(rocket => {
	console.log(rocket.toString());
});

// TEST
console.log(Rocket.ListToString());
