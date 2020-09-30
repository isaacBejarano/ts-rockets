(function () {
	// TEST

	// for (let i = 0; i < 10000; i++) {
	// 	let someRocket = new Rocket("someRock"); // stack overflow
	// }
	// const testRocket2 = new Rocket("test0001"); // no thrusters specified
	// const testRocket4 = new Rocket("test000222222"); // wrong code format
	// const testRocket5 = new Rocket("t005"); // wrong code format
	// const testRocket6 = new Rocket("     "); // not specified
	// const testRocket7 = new Rocket(""); // not specified
	// const testRocket8 = new Rocket(); // not specified
	// const testRocket9 = new Rocket("   test0009   "); // OK / .trim()
	// testRocket9.setThrusters = [new Thruster("    Merlin-10      ", 10)]; // {"Merlin", 0} // OK / .trim()
	// testRocket9.setThrusters = [new Thruster(" Merlin  ", -8)]; // {"Merlin", 0}
	// testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
	// testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}

	// Rockets instances --harcoded
	const falconHeavy = new Rocket("32wessds");
	const starShip = new Rocket("ldsfja32");

	// Add thrusters to rockets --harcoded
	falconHeavy.setThrusters = [
		new Thruster("Merlin-10", 10),
		new Thruster("Merlin-30", 30),
		new Thruster("Methalox-80", 80),
	];

	starShip.setThrusters = [
		new Thruster("Merlin-30", 30),
		new Thruster("Merlin-40", 40),
		new Thruster("Merlin-50", 50),
		new Thruster("Raptor-50", 50),
		new Thruster("Raptor-30", 30),
		new Thruster("Raptor-10", 10),
	];
})();

// 1. List of Rockets --init harcoded Rockets
window.onload = () => renderList();

// 2. main REFS
const outletList = document.getElementById("list-all-rockets") as HTMLOListElement;
const outletP = document.getElementById("counter-rockets") as HTMLSpanElement;
const outletSpan = document.querySelector("#counter-rockets .outlet") as HTMLSpanElement;
const btnList = document.getElementById("btn-show-all-rockets") as HTMLButtonElement;
const btnNew = document.getElementById("btn_create_rocket") as HTMLButtonElement;

// 3. List of Rockets --onclick to update Rocket <form>
btnList.addEventListener("click", function () {
	renderListReset(); //reset previous render
	renderList(); // render updated list

	// show list
	outletP.classList.toggle("is-hidden");
	outletList.classList.toggle("is-hidden");
});

// 4. Speed --onclick to update List of Rocket's Speed
// const speedUpButtons = document.querySelectorAll(".speed-up-power") as NodeListOf<HTMLButtonElement>;
const speedUpButtons = document.getElementsByClassName("speed-up-power") as HTMLCollectionOf<HTMLButtonElement>;
const speedDownButtons = document.getElementsByClassName("speed-down-power") as HTMLCollectionOf<HTMLButtonElement>;

console.log(speedUpButtons);
console.log(speedDownButtons);

//
// for (let i = 1; i < speedUpButtons.length; i++) {
// 	// speedUpButtons[0] is visibility hidden & speedUpButtons.length === speedDownButtons.length
// 	speedUpButtons[i].addEventListener("click", function () {
// 		Rocket.getRocketList[i - 1].speedUp(); // update data
// 		injectDataFromSpeed(this, i); // update DOM
// 	});

// 	speedDownButtons[i].addEventListener("click", function (this) {
// 		Rocket.getRocketList[i - 1].speedDown(); // update data
// 		injectDataFromSpeed(this, i); // update DOM
// 	});
// }

// 7. Create new rocket (with Thrusters)
const formCreateRocket = document.getElementById("form_create_rocket") as HTMLFormElement;
const inputRocketCode = document.getElementById("input_rocket_code") as HTMLInputElement;
const feedbacRocketCode = document.querySelector(`#${inputRocketCode.id} ~ div.invalid-feedback`) as HTMLElement;

btnNew.addEventListener("click", function () {
	formCreateRocket.classList.toggle("is-none");
});
