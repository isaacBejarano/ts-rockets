/* TEST
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
testRoket9.setThrusters = [new Thruster()]; // {"not specified", 0}
*/

/* STARTING DATA - Hardcoded Private Static Instances */

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

/* REFS */

// List of Rockets
const outletList = document.getElementById("list-all-rockets") as HTMLOListElement;
const outletP = document.getElementById("counter-rockets") as HTMLSpanElement;
const outletSpan = document.querySelector("#counter-rockets .outlet") as HTMLSpanElement;
const btnList = document.getElementById("btn-show-all-rockets") as HTMLButtonElement;

// Rocket <form>
const btnNew = document.getElementById("btn-create-rocket") as HTMLButtonElement;
const formRocket = document.getElementById("form-create-rocket") as HTMLFormElement;
const inputRocket = document.getElementById("input-rocket-code") as HTMLInputElement;
const feedbackRocket = document.querySelector(`#${inputRocket.id} ~ div.invalid-feedback`) as HTMLElement;
const btnSubmitRocket = document.getElementById("btn-submit-rocket") as HTMLButtonElement;

// Thrusters <form>
const btnAdd = document.getElementById("btn_add_thruster") as HTMLButtonElement;
const btnRemove = document.getElementById("btn-remove-last") as HTMLButtonElement;
const provisionalThrustersList = document.getElementById("provisional-thrusters-list") as HTMLParagraphElement;
const formThrusters = document.getElementById("form-add-thrusters") as HTMLFormElement;
const inputThrusterModel = document.getElementById("input-thruster-model") as HTMLInputElement;
const inputMaxThrust = document.getElementById("input-max-thrust") as HTMLInputElement;
const feedbackThrusterMax = document.querySelector(`#${inputMaxThrust.id} ~ div.invalid-feedback`) as HTMLElement;

/* EVENTS */

// 1. List of Rockets
btnList.addEventListener("click", function () {
	// reset previous render + re-render + add speed event
	resetList();
	renderList();
	addSpeedEvent();

	// show list
	outletP.classList.toggle("is-hidden");
	outletList.classList.toggle("is-hidden");
});

// 2. <form> Rocket -> show
btnNew.addEventListener("click", function () {
	formRocket.classList.toggle("is-none");
});

// 2. <form> Rocket -> instanciate new "Rocket"
inputRocket.addEventListener("input", function () {
	validateRocketCSS(this);
});
formRocket.addEventListener("submit", function (e) {
	validateToCreateRocket(e, this, inputRocket, formThrusters);
});

// 3. <form> Thrusters -> add to "Provisional List of Thrusters"
inputMaxThrust.addEventListener("input", function () {
	validateMaxThrustCSS(this);
});
btnAdd.addEventListener("click", function () {
	validateToProvisionalTrusterList(inputThrusterModel, inputMaxThrust);
});

// 4. <form> Thrusters -> remove from "Provisional List of Thrusters"
btnRemove.addEventListener("click", function () {
	let lastRocket = Rocket.getList[Rocket.getListLength() - 1];

	lastRocket.removeFromProvisionalThrustersList(); // pop()

	// "Provisional List of Thrusters" - update view
	renderProvisionalThrustersList(lastRocket);
});

// 5. <form> Thrusters -> accept "List of Thrusters"
formThrusters.addEventListener("submit", function () {
	let lastRocket = Rocket.getList[Rocket.getListLength() - 1];

	// "List of Thrusters" - accepted
	lastRocket.setThrusters = lastRocket.getProvisionalThrustersList;

	// "Provisional List of Thrusters" - destroy 
	lastRocket.setProvisionalThrustersList = [] as Thruster[];
	renderProvisionalThrustersList(lastRocket); // update view

	// <form> Rocket -  enable again
	disableFormRocket(false);
	inputRocket.value = "";

	// reset previous render + re-render + add speed event
	resetList();
	renderList();
	addSpeedEvent();

	// <form> Rocket + <form> Thrusters - close both
	alert(`Rocket "${lastRocket.getId}" successfully created`);
	formRocket.classList.toggle("is-none");
	formThrusters.classList.toggle("is-none");
});
