// 1. Rockets instances
const falconHeavy = new Rocket("32wessds");
const starShip = new Rocket("ldsfja32");

// 2. Add thrusters to rockets
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

// 3. Outlet
const outletList = document.getElementById("list-all-rockets") as HTMLOListElement;
const outletP = document.getElementById("counter-rockets") as HTMLSpanElement;
const outletSpan = document.querySelector("#counter-rockets .outlet") as HTMLSpanElement;

// TEST *********************
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
// ***************************

// 4. List of Rockets --init
renderList();

// 5. List of Rockets --onclick to update
const btnList = document.getElementById("btn-show-all-rockets") as HTMLButtonElement;
let initialListlength = outletList.children.length;

btnList.addEventListener("click", function () {
	// update
	if (outletList.children.length > initialListlength) renderList();
	// show list
	outletP.classList.toggle("is-hidden");
	outletList.classList.toggle("is-hidden");
});

// 6. Speed --onclick
let speedUpButtons = document.querySelectorAll(".speed-up-power") as NodeListOf<HTMLButtonElement>;
let speedDownButtons = document.querySelectorAll(".speed-down-power") as NodeListOf<HTMLButtonElement>;

// 6.1 speed up
for (let i = 1; i < speedUpButtons.length; i++) {
	// speedUpButtons[0] is visibility hidden
	speedUpButtons[i].addEventListener("click", function () {
		// update data
		Rocket.getRocketList[i - 1].speedUp();
		// inject updated data in ref
		let outletCurrentThrust = this.parentElement?.previousElementSibling?.children[3].children[1] as HTMLSpanElement;
		let outletCurrentPower = this.parentElement?.previousElementSibling?.children[4].children[1] as HTMLSpanElement;
		outletCurrentThrust.textContent = Rocket.getRocketList[i - 1].currentThrust();
		outletCurrentPower.textContent = Rocket.getRocketList[i - 1].totalPower().toString();
	});
}
// speed down 6.2
for (let i = 1; i < speedDownButtons.length; i++) {
	// speedUpButtons[0] is visibility hidden
	speedDownButtons[i].addEventListener("click", function () {
		// update data
		Rocket.getRocketList[i - 1].speedDown();
		// inject updated data in ref
		let outletCurrentThrust = this.parentElement?.previousElementSibling?.children[3].children[1] as HTMLSpanElement;
		let outletCurrentPower = this.parentElement?.previousElementSibling?.children[4].children[1] as HTMLSpanElement;
		outletCurrentThrust.textContent = Rocket.getRocketList[i - 1].currentThrust();
		outletCurrentPower.textContent = Rocket.getRocketList[i - 1].totalPower().toString();
	});
}

/* LIB */

function renderList() {
	// 1. Render List of Rockets
	const templateLiItem = document.querySelector(".template-li-item") as HTMLDivElement;

	Rocket.getRocketList.forEach((rocket, i) => {
		// 1.1 clone + append <li>
		const cloned = templateLiItem.cloneNode(true) as HTMLLIElement;
		outletList.append(cloned);

		// 1.2 <li> -> id + show
		cloned.id = `rocket-${i + 1}`;
		cloned.classList.remove("d-none");

		// 1.3 <li> <- inject data
		injectData(i, 0, rocket.getId); // <- Rocket
		injectData(i, 1, rocket.thrustersLength().toString()); // <- Thrusters
		injectData(i, 2, rocket.totalMaxThrust()); // <- Max. Power
		injectData(i, 3, rocket.currentThrust()); // <- Current Thrust
		injectData(i, 4, rocket.totalPower().toString()); // <- Current Power

		// 1.4 <li> validate CSS
		if (rocket.getId === "not specified" || rocket.getId === "wrong code format") invalidCSS(i, 0); // Rocket
		if (rocket.thrustersLength() < Rocket.getMinThrustersLength) {
			invalidCSS(i, 1); // Thrusters
			invalidCSS(i, 2); // Max. Power
		}
	});

	// 2. Render Number of Rockets
	outletSpan.textContent = Rocket.getListLength().toString(); // stringified
}

/* AUX */

// prettier-ignore
function injectData(i: number, HTMLTemplateIndex: number, action: string) {
	return (outletList.children[i + 1].children[0].children[0].children[
		HTMLTemplateIndex
	].children[1].textContent = action);
}

// prettier-ignore
function invalidCSS(i: number, HTMLTemplateIndex: number) {
	outletList
	.children[i+1].children[0].children[0]
	.children[HTMLTemplateIndex].children[1].classList.add("text-violet");
}
