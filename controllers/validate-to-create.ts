// 2. validate "Rocket" CSS
function validateRocketCSS(thisRef: HTMLInputElement): void {
	// prettier-ignore
	thisRef.value.length === 8
		? (thisRef.classList.add("is-valid"),
			thisRef.classList.remove("is-invalid"))
		: (thisRef.classList.add("is-invalid"),
			(feedbackRocket.textContent = '"Rocket Code" must have exactly 8 digits'));
}

// 2. validate "Rocket" value
function validateToCreateRocket(
	e: Event,
	thisRef: HTMLFormElement,
	inputRef: HTMLInputElement,
	thatRef: HTMLFormElement
): void {
	if (inputRef.value.length === 8) {
		// 1. new instance saved in Rocket.list
		const rocket = new Rocket(inputRef.value);

		// 2. clear <form> input + CSS
		thisRef.reset();
		inputRef.classList.remove("is-valid");

		// 3. reset previous List + re-render to update List
		renderListReset();
		renderList();
		addSpeedEvent();

		// 3. Disable Rocket <form> till Thruster <form> is submited
		inputRocket.value = rocket.getId;
		disableFormRocket(true);

		// 4. show <form2>
		thatRef.classList.toggle("is-none");

		// NOTE 1: variable "rocket" destroyed after Fn {} scope
		// NOTE 2: rockets saved in class Rocket, not in Global!
	} else {
		inputRef.classList.add("is-invalid");
		feedbackRocket.textContent = '"Rocket Code" must have exactly 8 digits';
		e.preventDefault();
		e.stopPropagation();
	}
}

// 3. validate "Provisional List of Thrusters" CSS
function validateMaxThrustCSS(thisRef: HTMLInputElement): void {
	isInt(+thisRef.value) && +thisRef.value >= Thruster.getMinThrust && +thisRef.value % Rocket.getPowerIncrement === 0
		? thisRef.classList.remove("is-invalid")
		: (thisRef.classList.add("is-invalid"),
		  (feedbackThrusterMax.textContent = `"Max.Thrust" must be 0 or positive multiple of ${Rocket.getPowerIncrement}`));
}

// 3. validate "Provisional List of Thrusters" values
function validateToProvisionalTrusterList(inputRef1: HTMLInputElement, inputRef2: HTMLInputElement): void {
	let model: string = inputRef1.value;
	let maxThrust: number = Thruster.getMinThrust; // default 0
	let lastRocket = Rocket.getList[Rocket.getListLength() - 1];

	// "Max.Thrust" cannot be negative nor decimal
	if (
		isInt(+inputRef2.value) &&
		+inputRef2.value >= Thruster.getMinThrust &&
		+inputRef2.value % Rocket.getPowerIncrement === 0
	) {
		maxThrust = +inputRef2.value; // parsed int
		inputRef2.classList.remove("is-invalid");

		// push to last Rocket's Provisional List of Thrusters
		lastRocket.addToProvisionalThrustersList(new Thruster(model, maxThrust));

		// show provisional List
		renderProvisionalThrustersList(lastRocket);

		// clear input for next provisional Thruster
		inputRef1.value = "";
		inputRef2.value = "";
	}
}
