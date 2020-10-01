// AUXILIARY FUNCTIONS
function renderListReset() {
	while (outletList.children.length > 1) {
		// Don't remove firstChild since it's the <li> template to clone in outlet <ol>
		let lastElement = outletList.children[outletList.children.length - 1];
		outletList.removeChild(lastElement);
	}
}

function renderList() {
	const templateLiItem = document.querySelector(".template-li-item") as HTMLDivElement;

	// 1. Render List of Rockets
	Rocket.getList.forEach((rocket, i) => {
		// 1.1 clone + append <li>
		const cloned = templateLiItem.cloneNode(true) as HTMLLIElement;
		outletList.append(cloned);

		// 1.2 <li> -> add id's + show
		let currentThrustOutlet = cloned.querySelector("#current-thrust") as HTMLSpanElement;
		let totalPowerOutlett = cloned.querySelector("#current-thrust") as HTMLSpanElement;
		cloned.classList.remove("d-none");

		cloned.id = `rocket-${i + 1}`; // Rocket
		currentThrustOutlet.id = `current-thrust-${i + 1}`; // Current Thrust
		totalPowerOutlett.id = `total-power-${i + 1}`; // Total Pwower

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

// render Thrusters Provisional list
function renderProvisionalThrustersList(lastRocket: Rocket) {
	let listToString: string = "";

	for (let thruster of lastRocket.getProvisionalThrustersList) {
		listToString += `{ ${thruster.getModel} : ${thruster.getMaxThrust} } , `;
	}

	listToString.length > 0
		? provisionalThrustersList.classList.add("d-block")
		: provisionalThrustersList.classList.remove("d-block");

	provisionalThrustersList.innerHTML = `${listToString}`;
}

// dissable/enable Rockets <form>
function disableFormRocket(boolean: boolean) {
	inputRocket.disabled = boolean;
	inputRocket.classList.toggle("is-not-allowed");

	btnSubmitRocket.disabled = boolean;
	btnSubmitRocket.classList.toggle("is-not-allowed");
}

// Number.isInteger() is ES6, doesn't exist in ES5 -> my workaround => isInt(num)
function isInt(x: number) {
	let num = "" + (x * 10); // stringified
	return num[num.length - 1] === "0" ? true : false;
}
