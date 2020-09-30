/* TESTING

// for (let i = 0; i < 10000; i++) {
// 	let someRocket = new Rocket("someRock"); // -> stack overflow
// }

const testRocket2 = new Rocket("test0001"); // no thrusters specified
const testRocket4 = new Rocket("test000222222"); // wrong code format
const testRocket5 = new Rocket("t005"); // wrong code format
const testRocket6 = new Rocket("     "); // not specified
const testRocket7 = new Rocket(""); // not specified
const testRocket8 = new Rocket(); // not specified
const testRocket9 = new Rocket("   test0009   "); // OK / .trim()
testRocket9.setThrusters = [new Thruster("    Merlin-10      ", 10)]; // {"Merlin", 0} // OK / .trim()
testRocket9.setThrusters = [new Thruster(" Merlin  ", -8)]; // {"Merlin", 0}
testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
*/

// Hardcoded Private Static Instances
(function () {
	let rocket = new Rocket("32wessds"); // instance 1

	// add thrusters to instance 1
	rocket.setThrusters = [new Thruster("Merlin-10", 10), new Thruster("Merlin-30", 30), new Thruster("Methalox-80", 80)];

	// re-assign instance
	rocket = new Rocket("ldsfja32"); // instance 2

	// add thrusters to instance 2
	rocket.setThrusters = [
		new Thruster("Merlin-30", 30),
		new Thruster("Merlin-40", 40),
		new Thruster("Merlin-50", 50),
		new Thruster("Raptor-50", 50),
		new Thruster("Raptor-30", 30),
		new Thruster("Raptor-10", 10),
	];

	// NOTE 1: variable "rocket" destroyed after Fn{} scope
	// NOTE 2: rockets saved in class Rocket, not in Global!
})();

// 1. REFS
const outletList = document.getElementById("list-all-rockets") as HTMLOListElement;
const outletP = document.getElementById("counter-rockets") as HTMLSpanElement;
const outletSpan = document.querySelector("#counter-rockets .outlet") as HTMLSpanElement;
const btnList = document.getElementById("btn-show-all-rockets") as HTMLButtonElement;
const btnNew = document.getElementById("btn-create-rocket") as HTMLButtonElement;

// 2. List of Rockets
btnList.addEventListener("click", function () {
	renderListReset(); //reset previous render
	renderList(); // new render
	addSpeedEvent(); // add speed event

	// show list
	outletP.classList.toggle("is-hidden");
	outletList.classList.toggle("is-hidden");
});

// 3. Create Rocket
const formRocket = document.getElementById("form-create-rocket") as HTMLFormElement;
const inputRocket = document.getElementById("input-rocket-code") as HTMLInputElement;
const feedbacRocket = document.querySelector(`#${inputRocket.id} ~ div.invalid-feedback`) as HTMLElement;
const btnSubmitRocket = document.getElementById("btn-submit-rocket") as HTMLButtonElement;

btnNew.addEventListener("click", function () {
	formRocket.classList.toggle("is-none");
});

// 4. Add Thrusters
const formThrusters = document.getElementById("form-add-thrusters") as HTMLFormElement;
