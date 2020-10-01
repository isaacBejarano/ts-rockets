/* AUX */

// render "List of Rockets"
function renderList() {
	const templateLi = document.querySelector(".template-li-item") as HTMLDivElement;

	// 1. Render List of Rockets
	Rocket.getList.forEach((rocket, i) => {
		// 1.1 <li> create all
		const cloned = templateLi.cloneNode(true) as HTMLLIElement; // clone template <li>

		outletList.append(cloned); // append <li>
		cloned.id = `rocket-${i + 1}`; // <li> id
		cloned.classList.remove("d-none"); // show <ol>

		// 1.2 <li> create id's for models
		const modelRocket = cloned.querySelector("#model-rocket") as HTMLSpanElement;
		const modelThrusters = cloned.querySelector("#model-thrusters") as HTMLSpanElement;
		const modelMaxThrust = cloned.querySelector("#model-max-thrust") as HTMLSpanElement;
		const modelCurrentThrust = cloned.querySelector("#model-current-thrust") as HTMLSpanElement;
		const modelTotalPower = cloned.querySelector("#model-total-power") as HTMLSpanElement;

		modelRocket.id = `model-rocket-${i + 1}`; // Rocket
		modelThrusters.id = `model-thrusters-${i + 1}`; // Thrusters
		modelMaxThrust.id = `model-max-thrust-${i + 1}`; // Max.Thrust
		modelCurrentThrust.id = `model-current-thrust-${i + 1}`; // Current Thrust
		modelTotalPower.id = `model-total-power-${i + 1}`; // Total Pwower

		// 1.3 <li> inject data into models
		modelRocket.textContent = rocket.getId; // <- Rocket
		modelThrusters.textContent = rocket.thrustersLength().toString(); // <- Thrusters
		modelMaxThrust.textContent = rocket.totalMaxThrust(); // <- Max.Thrust
		modelCurrentThrust.textContent = rocket.currentThrust(); // <- Current Thrust
		modelTotalPower.textContent = rocket.totalPower().toString(); // <- Total Power

		// 1.4 <li> models Thrusters + Max.Thrust --validate CSS
		if (rocket.thrustersLength() < Rocket.getMinThrustersLength) {
			modelThrusters.classList.add("text-gold"); // ~ warning
			modelMaxThrust.classList.add("text-gold"); // ~ warning
		}
	});

	// 2. Render Number of Rockets
	outletSpan.textContent = Rocket.getListLength().toString();
}

// reset "List of Rockets"
function resetList() {
	while (outletList.children.length > 1) {
		const lastChild = outletList.querySelector(`#${outletList.id} li:last-child`) as HTMLLIElement;
		outletList.removeChild(lastChild);
	}
	// NOTE: Don't remove firstChild since it's the <li> template to clone in outlet <ol>
}

// Add Speed Event
function addSpeedEvent() {
	const speedUpButtons = document.getElementsByClassName("speed-up-power") as HTMLCollectionOf<HTMLButtonElement>;
	const speedDownButtons = document.getElementsByClassName("speed-down-power") as HTMLCollectionOf<HTMLButtonElement>;

	for (let i = 0; i < Rocket.getListLength(); i++) {
		// buttons and models [0] are hidden / they belong to <li> template
		const modelCurrentThrust = document.getElementById(`model-current-thrust-${i + 1}`) as HTMLSpanElement;
		const modelTotalPower = document.getElementById(`model-total-power-${i + 1}`) as HTMLSpanElement;

		speedUpButtons[i + 1].addEventListener("click", function () {
			Rocket.getList[i].speedUp(); // update Rocket.list
			modelCurrentThrust.textContent = Rocket.getList[i].currentThrust(); // <- Current Thrust
			modelTotalPower.textContent = Rocket.getList[i].totalPower().toString(); // <- Total Power
		});

		speedDownButtons[i + 1].addEventListener("click", function (this) {
			Rocket.getList[i].speedDown(); // update Rocket.list
			modelCurrentThrust.textContent = Rocket.getList[i].currentThrust(); // <- Current Thrust
			modelTotalPower.textContent = Rocket.getList[i].totalPower().toString(); // <- Total Power
		});
	}
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

// ES6's Number.isInteger() doesn't exist in ES5 -> my workaround by "isInt(num)"
function isInt(x: number) {
	let num = "" + x * 10; // stringified
	return num[num.length - 1] === "0" ? true : false;
}
