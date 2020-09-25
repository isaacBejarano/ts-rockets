// 1. set thrusters and rockets
const merlin10 = new Thruster("Merlin", 10);
const merlin30 = new Thruster("Merlin", 30);
const kestrel80 = new Thruster("Kestrel", 80);
const raptor30 = new Thruster("Raptor", 30);
const raptor40 = new Thruster("Raptor", 40);
const raptor50 = new Thruster("Raptor", 50);
const raptor50b = new Thruster("Raptor", 50);
const methalox30 = new Thruster("Methalox", 30);
const methalox10 = new Thruster("Methalox", 10);

let falconHeavy = new Rocket("32wessds");
let starShip = new Rocket("ldsfja32");

// 2. add thrusters to rockets
falconHeavy.setThrusters = [merlin10, merlin30, kestrel80];
starShip.setThrusters = [raptor30, raptor40, raptor50, raptor50b, methalox30, methalox10];

// 3. outlet
Rocket.ListToString().forEach(rocket => {
	console.log(rocket.toString());
});

// TEST
console.log(Rocket.ListToString());
