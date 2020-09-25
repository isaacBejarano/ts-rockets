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
let outletList = document.getElementById("list-all-rockets") as HTMLOListElement;
let outletSpan = document.getElementById("counter-rockets") as HTMLSpanElement;
outletSpan.textContent = "Rockets: " + Rocket.CountToString(); // stringified

// 4. list of Rockets --init
renderList();

// 5. List of Rockets --update
let btn = document.getElementById("btn-show-all-rockets") as HTMLButtonElement; // ref
let initialListlength = outletList.children.length;

// listener
btn.addEventListener("click", function () {
	if (outletList.children.length > initialListlength) renderList(); // update

	// show list
	outletSpan.classList.toggle("is-hidden");
	outletList.classList.toggle("is-hidden");
});

/* LIB */
function renderList() {
	const templateLiItem = document.querySelector(".template-li-item") as HTMLLIElement;

	Rocket.rocketList.forEach((rocket, i) => {
		// 1. clone HTML template
		let cloned = templateLiItem.cloneNode(true) as HTMLLIElement;

		// 2. append cloned + make it visible
		outletList.append(cloned);
		cloned.classList.remove("d-none");

		// 3. inject data
		outletList.children[i].children[0].children[1].textContent = rocket.getId;
		outletList.children[i].children[1].children[1].textContent = rocket.thrustersToString();
		outletList.children[i].children[2].children[1].textContent = rocket.totalMaxThrust();
	});
}
