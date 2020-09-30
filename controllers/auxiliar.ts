// AUXILIARY FUNCTIONS
function renderListReset() {
	// lengt > 1 / firstChild is the template <li> with HTMNL to clone
	while (outletList.children.length > 1) {
		outletList.removeChild(outletList.children[outletList.children.length - 1]);
	}
}

/* LIB */

function renderList() {
	// 1. Render List of Rockets
	const templateLiItem = document.querySelector(".template-li-item") as HTMLDivElement;

	Rocket.getList.forEach((rocket, i) => {
		// 1.1 clone + append <li>
		const cloned = templateLiItem.cloneNode(true) as HTMLLIElement;
		outletList.append(cloned);

		// 1.2 <li> -> add id's + show
		cloned.id = `rocket-${i + 1}`; // Rocket
		cloned.children[0].children[0].children[3].children[1].id = `current-thrust-${i + 1}`; // Current Thrust
		cloned.children[0].children[0].children[4].children[1].id = `total-power-${i + 1}`; // Total Pwower
		cloned.classList.remove("d-none");

		// 1.3 <li> <- inject data
		dataToDOM(i, 0, rocket.getId); // <- Rocket
		dataToDOM(i, 1, rocket.thrustersLength().toString()); // <- Thrusters
		dataToDOM(i, 2, rocket.totalMaxThrust()); // <- Max. Power
		dataToDOM(i, 3, rocket.currentThrust()); // <- Current Thrust
		dataToDOM(i, 4, rocket.totalPower().toString()); // <- Total Power

		// 1.4 <li> validate CSS
		if (rocket.getId === "not specified" || rocket.getId === "wrong code format") invalidCSS(i, 0); // Rocket
		if (rocket.thrustersLength() < Rocket.getMinThrustersLength) {
			invalidCSS(i, 1); // Thrusters
			invalidCSS(i, 2); // Max. Thrust
		}
	});

	// 2. Render Number of Rockets
	outletSpan.textContent = Rocket.getListLength().toString(); // stringified
}

// Add Speed Event
function addSpeedEvent() {
	const speedUpButtons = document.getElementsByClassName("speed-up-power") as HTMLCollectionOf<HTMLButtonElement>;
	const speedDownButtons = document.getElementsByClassName("speed-down-power") as HTMLCollectionOf<HTMLButtonElement>;

	// speedUpButtons[0] is hidden => Rocket[i] -> btn[i+1]
	for (let i = 0; i < Rocket.getListLength(); i++) {
		speedUpButtons[i + 1].addEventListener("click", function () {
			Rocket.getList[i].speedUp(); // update Rocket.list
			speedToDOM(this, i); // update DOM
		});

		speedDownButtons[i + 1].addEventListener("click", function (this) {
			Rocket.getList[i].speedDown(); // update Rocket.list
			speedToDOM(this, i); // update DOM
		});
	}
}
/* AUX */

// prettier-ignore
function dataToDOM(i: number, HTMLTemplateIndex: number, action: string) {
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

function speedToDOM(buton: HTMLButtonElement, i: number) {
	let outletCurrentThrust = buton.parentElement?.previousElementSibling?.children[3].children[1] as HTMLSpanElement;
	let outletCurrentPower = buton.parentElement?.previousElementSibling?.children[4].children[1] as HTMLSpanElement;

	outletCurrentThrust.textContent = Rocket.getList[i].currentThrust(); // <- Current Thrust
	outletCurrentPower.textContent = Rocket.getList[i].totalPower().toString(); // <- Total Power
}
