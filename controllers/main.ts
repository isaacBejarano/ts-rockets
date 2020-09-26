// 1. Thrusters & Rockets instances
const merlin10 = new Thruster("Merlin-10", 10);
const merlin30 = new Thruster("Merlin-30", 30);
const raptor40 = new Thruster("Raptor-40", 40);
const raptor50 = new Thruster("Raptor-50", 50);
const methalox80 = new Thruster("Methalox-80", 80);

let falconHeavy = new Rocket("32wessds");
let starShip = new Rocket("ldsfja32");

// 2. Add thrusters to rockets
// prettier-ignore
starShip.setThrusters = [
	merlin30, raptor40, raptor50,
	raptor50, merlin30, merlin10
];
falconHeavy.setThrusters = [merlin10, merlin30, methalox80];

// 3. Outlet
let outletList = document.getElementById("list-all-rockets") as HTMLOListElement;
let outletSpan = document.getElementById("counter-rockets") as HTMLSpanElement;

// TEST *********************
// for (let i = 0; i < 10000; i++) {
// 	let someRocket = new Rocket("someRock"); // stack overflow
// }

// let testRocket2 = new Rocket("test0002"); // no thrusters specified
// let testRocket3 = new Rocket("test0003"); // insuficient thrusters
// testRocket3.setThrusters = [merlin10];
// let testRocket4 = new Rocket("test00044444444"); // wrong code format
// testRocket4.setThrusters = [merlin10, raptor40];
// let testRocket5 = new Rocket("t005"); // wrong code format
// testRocket5.setThrusters = [merlin10, raptor40];
// let testRocket6 = new Rocket("     "); // not specified
// testRocket6.setThrusters = [merlin10, raptor40];
// let testRocket7 = new Rocket(""); // not specified
// testRocket7.setThrusters = [merlin10, raptor40];
// let testRocket8 = new Rocket(); // not specified
// testRocket8.setThrusters = [merlin10, raptor40];
// let testRocket9 = new Rocket("   test0006   "); // OK / .trim()
// testRocket9.setThrusters = [merlin10, raptor40];

// const merlin10 = new Thruster("   Merlin  "); // ("Merlin", 0)
// const merlin30 = new Thruster(" Merlin  ", -8); // ("Merlin", 0)
// const methalox80 = new Thruster(); // ("not specified", 0)

// console.log(Rocket.getRocketList[1].getThrusters[0]);
// console.log(Rocket.getRocketList[1].getThrusters[1]);
// console.log(Rocket.getRocketList[1].getThrusters[2]);
// ***************************

// 4. List of Rockets --init
renderList();

// 5. List of Rockets --update
let btn = document.getElementById("btn-show-all-rockets") as HTMLButtonElement; // ref
let initialListlength = outletList.children.length;

/* LISTENER */
btn.addEventListener("click", function () {
	if (outletList.children.length > initialListlength) renderList(); // update

	// show list
	outletSpan.classList.toggle("is-hidden");
	outletList.classList.toggle("is-hidden");
});

/* LIB */
function renderList() {
	const templateLiItem = document.querySelector(".template-li-item") as HTMLDivElement;
	// render List of Rockets
	Rocket.getRocketList.forEach((rocket, i) => {
		// 1. clone HTML template
		let cloned = templateLiItem.cloneNode(true) as HTMLLIElement;

		// 2. append cloned + make it visible
		outletList.append(cloned);
		cloned.classList.remove("d-none");

		// 3. inject data + validation CSS
		// -> Rocket
		// prettier-ignore
		outletList
		.children[i].children[0].children[0]
		.children[0].children[1].textContent = rocket.getId;

		if (rocket.getId === "not specified" || rocket.getId === "wrong code format") {
			// prettier-ignore
			outletList
			.children[i].children[0].children[0]
			.children[0].children[1].classList.add("text-danger");
		}

		// -> Thrusters
		// prettier-ignore
		outletList
		.children[i].children[0].children[0]
		.children[1].children[1].textContent = rocket.totalThrustersToString();

		if (+rocket.totalThrustersToString() < Rocket.getminThrusters) {
			// prettier-ignore
			outletList
			.children[i].children[0].children[0]
			.children[1].children[1].classList.add("text-danger");

			// prettier-ignore
			outletList
			.children[i].children[0].children[0]
			.children[2].children[1].classList.add("text-danger");
		}

		// -> Max. Power
		// prettier-ignore
		outletList
		.children[i].children[0].children[0]
		.children[2].children[1].textContent = rocket.totalMaxThrust();
	});

	// render number of Rockets in the List
	outletSpan.textContent = "Rockets: " + Rocket.countToString(); // stringified
}
